<template>
  <div class="ticket-list">
    <ticket-card
        v-for="(ticket, index) in tickets"
        :key="`ticket-card-${index}`"
        :ticket="ticket"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Ticket} from "@/services/types";
import TicketCard from "@/components/TicketCard/index.vue";

@Component({
  name: 'TicketList',
  components: {
    TicketCard
  }
})
export default class TicketList extends Vue {
  @Prop({required: true})
  tickets!: Ticket[]
}
</script>

<style scoped>
.ticket-list{
  max-height: 100vh;
  overflow-y: auto;
}
</style>
