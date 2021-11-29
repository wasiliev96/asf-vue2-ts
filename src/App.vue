<template>
  <div id="app">
    <svg-icon icon-class="logo" class-name="logo"></svg-icon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {getSearchId, getTickets} from "@/services/AviaSalesService";
import {Ticket} from "./services/types";
type DataType = {
  tickets: null | Ticket[]
}

export default Vue.extend({
  name: 'App',
  components: {},
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

<style lang="scss">

</style>
