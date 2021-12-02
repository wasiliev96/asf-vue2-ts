<template>
  <div class="ticket-list-wrapper">
    <div class="ticket-list"
         v-if="renderedTickets.length"
    >
      <DynamicScroller
          ref="scroller"
          :items="renderedTickets"
          :item-size="222"
          :to-bottom="increaseLimit"
          :min-item-size="54"
          class="scroller"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
              :item='item'
              :active='active'
              :data-index='index'
          >
            <ticket-card
                :ticket="item"
            />
          </DynamicScrollerItem>

        </template>
      </DynamicScroller>
      <VButton
          class="show-more"
          v-if="isMoreButtonShown"
          @click.native="increaseLimit">Показать еще 5!
      </VButton>
    </div>

    <div v-else class="placeholder">
      <p>Sorry, no tickets here...</p>
    </div>
    <!-- /.placeholder -->
  </div>
  <!-- /.ticket-list-wrapper -->
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Ticket} from "@/services/types";
import TicketCard from "@/components/TicketCard/index.vue";
import VButton from '@/components/VButton/index.vue';
import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

@Component({
  name: 'TicketList',
  components: {
    VButton,
    TicketCard,
    DynamicScroller,
    DynamicScrollerItem
  }
})
export default class TicketList extends Vue {
  @Prop({required: true})
  tickets!: Ticket[]

  get renderedTickets():Ticket[] {
    return this.tickets.slice(0, this.limit);
  }

  get isMoreButtonShown():boolean {
    return this.renderedTickets.length < this.tickets.length
  }

  limit = 5

  increaseLimit(): void {
    this.limit += 5;
    console.log(this.$refs.scroller)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.$refs.scroller.scrollToItem(this.limit);
  }

  mounted(): void {
    console.log(this.renderedTickets);
  }
}
</script>

<style scoped>
.ticket-list {
  max-height: 70vh;
  overflow-y: auto;
  margin-top: 10px;
}

.placeholder {
  padding: 25px;
  text-align: center;
}
.show-more{
  margin-bottom: 15px;
}
</style>
