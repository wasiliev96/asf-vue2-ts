<template>
  <div id="app">
    <svg-icon icon-name="logo" class-name="logo"></svg-icon>
    <div v-if="tickets" class="ticket-flow">
      <ticket-card
          v-for="(ticket, index) in tickets"
          :key="`ticket-card-${index}`"
          :ticket="ticket"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {getSearchId, getTickets} from "@/services/AviaSalesService";
import {Ticket} from "./services/types";
import TicketCard from "@/components/TicketCard/index.vue";

type DataType = {
  tickets: null | Ticket[]
}

export default Vue.extend({
  name: 'App',
  components: {
    TicketCard
  },
  data: (): DataType => ({
    tickets: null,
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
.ticket-flow {
  max-width: 500px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
