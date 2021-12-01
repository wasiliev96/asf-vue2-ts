<template>
  <div class="ticket-list">
    <DynamicScroller
        :items="tickets"
        :min-item-size="54"
        class="scroller"
    >
      <template v-slot="{ item, index }">
        <DynamicScrollerItem
            :item="item"
            :active="!!index"
            :data-index="index"
        >
          <ticket-card
              :key="index"
              :ticket="item"
          />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Ticket} from "@/services/types";
import TicketCard from "@/components/TicketCard/index.vue";
import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

@Component({
  name: 'TicketList',
  components: {
    TicketCard,
    DynamicScroller,
    DynamicScrollerItem
  }
})
export default class TicketList extends Vue {
  @Prop({required: true})
  tickets!: Ticket[]
}
</script>

<style scoped>
.ticket-list {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
