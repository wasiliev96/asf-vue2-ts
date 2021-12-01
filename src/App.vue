<template>
  <div id="app">
    <div class="page">
      <PageHeader/>
      <main class="content">
        <aside class="content__aside">
          <FilterBar
              :filters="filters"
              v-model="selectedFilters"
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
import Vue from 'vue';
import {getSearchId, getTickets} from "@/services/AviaSalesService";
import {Ticket} from "./services/types";
import TicketCard from "@/components/TicketCard/index.vue";
import TicketList from "@/components/TicketList/index.vue";
import RadioGroup from "@/components/RadioGroup/index.vue";
import FilterBar from "@/components/FilterBar/index.vue";
import PageHeader from "@/components/PageHeader/index.vue";

type sortType = 'speed' | 'cheap' | 'optimal' | null;

type FilterValue = 'all' | number;

interface FilterType {
  title: string,
  value: FilterValue
}

type DataType = {
  tickets: null | Ticket[],
  sortButtons: { title: string, value: sortType }[],
  sortBy: sortType,

  filters: FilterType[],
  selectedFilters: FilterType[],
}

export default Vue.extend({
  name: 'App',
  components: {
    PageHeader,
    FilterBar,
    RadioGroup,
    TicketList,
  },
  data: (): DataType => ({
    tickets: null,
    sortButtons: [
      {
        title: 'Самый быстрый',
        value: 'speed',
      },
      {
        title: 'Самый дешевый',
        value: 'cheap'
      },
      {
        title: 'Оптимальный',
        value: 'optimal'
      }
    ],
    sortBy: 'optimal',

    filters: [
      {
        title: '1 пересадка',
        value: 1
      },
      {
        title: '2 пересадки',
        value: 2
      }
    ],
    selectedFilters: []
  }),
  mounted() {
    getSearchId()
        .then(res => res.data)
        .then(data => data.searchId)
        .then(getTickets)
        .then(res => res.data)
        .then(data => this.tickets = data.tickets)
        .catch(error => console.error(error))
  }
});
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
  @include tablet {
    flex-direction: row;
  }

  &__aside {
    flex: 1 1 232px;
  }

  &__body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
