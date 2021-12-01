<template>
  <div class="card ticket-card">
    <div class="card__header">
      <h1 class="card__title" v-text="formatCurrencyString(ticket.price)"/>
      <CompanyLogo :iata="ticket.carrier"/>
    </div>
    <!-- /.card__header -->
    <div class="card__body">
      <table class="table card__table">
        <tr class="table__row"
            v-for="(segment, index) in ticket.segments"
            :key="`segment-${index}-${segment.date}`"
        >
          <td class="table__cell cell">
            <p class="cell-caption">{{ segment.origin }} – {{ segment.destination }}</p>
            <!-- /.cell__caption -->
            <p class="cell-value">{{ timeIntervalString(segment.date, segment.duration) }}</p>
            <!-- /.cell-value -->
          </td>
          <!-- /.table-cell -->
          <td class="table__cell cell">
            <p class="cell-caption">В пути</p>
            <!-- /.cell__caption -->
            <p class="cell-value">{{ durationString(segment.duration) }}</p>
            <!-- /.cell-value -->
          </td>
          <!-- /.table-cell -->
          <td class="table__cell cell">
            <p class="cell-caption">{{ segment.stops.length }} {{ stopsCountString(segment.stops.length) }}</p>
            <!-- /.cell__caption -->
            <p class="cell-value">{{ segment.stops.join(',') }}</p>
            <!-- /.cell-value -->
          </td>
          <!-- /.table-cell -->
        </tr>
        <!-- /.table__row -->
      </table>
      <!-- /.card__table -->
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.ticket-card -->
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Ticket} from "@/services/types";
import CompanyLogo from "@/components/TicketCard/CompanyLogo.vue";
import priceString from "@/common/functions/priceString";
import durationString from "@/common/functions/durationString";
import stopsCountString from '@/common/functions/stopsCountString';
import timeIntervalString from "@/common/functions/timeIntervalString";

@Component({
  name: 'TicketCard',
  components: {CompanyLogo}
})
export default class TicketCard extends Vue {
  @Prop({
    required: true
  })
  ticket!: Ticket;

  get ticketObj(): Ticket {
    return this.ticket;
  }

  formatCurrencyString(currencyValue: number): string {
    return priceString<number>(currencyValue)
  }

  durationString = durationString
  stopsCountString = stopsCountString
  timeIntervalString = timeIntervalString
}
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: var(--color-white);
  margin-block: 10px;
}

.card__header {
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-bottom: 20px;
}

.card__title {
  color: var(--color-accent);
}

.card__table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px;
}

.table__cell {
  vertical-align: baseline;
}

.cell-caption {
  color: var(--color-secondary);
  text-transform: uppercase;
}
</style>
