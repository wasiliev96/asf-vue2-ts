<template>
  <div id="app">
    <div class="page">
      <header class="page-header">
        <svg-icon icon-name="logo" class-name="logo"></svg-icon>
      </header>
      <!-- /.page-header -->
      <main class="content">
        <aside class="content__aside">

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

type sortType = 'speed' | 'cheap' | 'optimal' | null;

type DataType = {
  tickets: null | Ticket[],
  sortButtons: { title: string, value: sortType }[],
  sortBy: sortType
}

export default Vue.extend({
  name: 'App',
  components: {
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
    sortBy: 'optimal'
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
  width: min(800px, 100%);
  max-width: 1200px;
  margin-inline: auto;

  &__aside {
    flex: 1 1 232px;
    display: none;
    @include tablet {
      display: block;
    }
  }

  &__body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
