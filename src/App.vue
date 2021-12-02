<template>
  <div id="app">
    <div class="page">
      <PageHeader/>
      <main class="content">
        <aside class="content__aside">
          <FilterBar
              :filters="filters"
              v-model="stopsFilter"
          />
        </aside>
        <!-- /.content-aside -->
        <div class="content__body">
          <RadioGroup :items="sortButtons" v-model="sortBy"/>
          <TicketList :tickets="tickets"/>
        </div>
        <!-- /.content__body -->
      </main>
      <!-- /.page-content -->
    </div>
    <!-- /.page -->
  </div>
</template>

<script lang="ts">
import {Ticket} from "./services/types";
import TicketList from "@/components/TicketList/index.vue";
import RadioGroup from "@/components/RadioGroup/index.vue";
import FilterBar from "@/components/FilterBar/index.vue";
import PageHeader from "@/components/PageHeader/index.vue";
import {Component, Vue, Watch} from "vue-property-decorator";
import {ACTION_TYPES, GETTER_TYPES} from "@/store/types";
import {LOAD_STATUS} from "@/store/state";

enum SORT_TYPE {
  speed = 'speed',
  cheap = 'cheap',
  optimal = 'optimal'
}

type SortType = SORT_TYPE.optimal | SORT_TYPE.cheap | SORT_TYPE.speed | null;

interface FilterType {
  title: string,
  value: number,
  active: boolean
}

type SortButtons = { title: string, value: SortType }[]
@Component({
  name: 'App',
  components: {
    PageHeader,
    FilterBar,
    RadioGroup,
    TicketList,
  },
})
export default class App extends Vue {

  sortButtons: SortButtons = [
    {
      title: 'Самый быстрый',
      value: SORT_TYPE.speed,
    },
    {
      title: 'Самый дешевый',
      value: SORT_TYPE.cheap
    },
    {
      title: 'Оптимальный',
      value: SORT_TYPE.optimal
    }
  ]

  sortBy: SortType = SORT_TYPE.optimal

  filters: FilterType[] = [
    {
      title: '1 пересадка',
      value: 1,
      active: false,
    },
    {
      title: '2 пересадки',
      value: 2,
      active: false,
    }
  ]
  stopsFilter = this.filters.filter(filter => filter.active).map(filter => filter.value);


  get tickets(): Ticket[] | undefined {
    return this.$store.getters[GETTER_TYPES.FILTERED_TICKETS](this.stopsFilter, this.sortBy);
  }

  get ticketLoadingError() {
    return this.$store.state.loading.status === LOAD_STATUS.REJECT
  }

  @Watch('ticketLoadingError')
  responseErrorHandler(isError: boolean): void {
    if (isError) {
      this.$toasted.show('Упс... Что-то пошло не так. Перезагрузите страницу', {
        type: 'error',
        fullWidth: true,
        duration: 5000,
        onComplete: () => {
          console.log('completed')
          location.reload()
        }
      })
    }
  }

  mounted() {
    this.$store.dispatch(ACTION_TYPES.LOAD_TICKETS);
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/mixins';

.content {
  display: flex;
  gap: 20px;
  justify-content: center;
  width: min(800px, 100%);
  max-width: 1200px;
  margin-inline: auto;
  flex-direction: column;
  padding-inline: 32px;

  @include tablet {
    flex-direction: row;
    padding-inline: 0;
  }

  &__aside {
    flex: 1 1 232px;
  }

  &__body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
}
</style>
