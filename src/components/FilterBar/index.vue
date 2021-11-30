<template>
  <div class="filter-bar">
    <ul class="filter-list">
      <li class="filter"
      >
        <label class="filter__label" @mousedown="toggleSelectAll">
          <input class="filter__input" type="checkbox"/>
          <div class="filter__item">
            <div class="filter__checkbox"
                 :class="{'checked':allSelected}"
            >
              <svg-icon icon-name="check" class-name="logo"/>
            </div>
            <!-- /.filter__checkbox -->
            <p class="filter-item__text">Все</p>
            <!-- /.filter-item__text -->
          </div>
          <!-- /.filter__item -->
        </label>
      </li>
      <!-- /.filter-item -->
      <li class="filter"
          v-for="(filter, index) in filters"
          :key="`filter-index-${index}`"
      >
        <label class="filter__label">
          <input class="filter__input" type="checkbox" :value="filter" v-model="filterValue"/>
          <div class="filter__item">
            <div class="filter__checkbox" :class="{'checked':filterValue.find(item=>item.value===filter.value)}">
              <svg-icon icon-name="check" class-name="logo"/>
            </div>
            <!-- /.filter__checkbox -->
            <p class="filter-item__text" v-text="filter.title"></p>
            <!-- /.filter-item__text -->
          </div>
          <!-- /.filter__item -->
        </label>
      </li>
      <!-- /.filter-item -->
    </ul>
    <!-- /.filter-list -->
  </div>
  <!-- /.filterbar -->
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import SvgIcon from "@/components/SvgIcon/index.vue";

type FilterValue = 'all' | number;

interface FilterType {
  title: string,
  value: FilterValue
}

@Component({
  name: 'FilterBar',
  components: {
    SvgIcon
  }
})
export default class FilterBar extends Vue {
  @Prop({required: true})
  filters!: FilterType[]

  @Prop({required: true})
  value!: FilterType[]

  allSelected = false

  get filterValue() {
    return this.value
  }

  set filterValue(value) {
    this.$emit('input', value);
  }

  toggleSelectAll() {
    if (this.allSelected) {
      this.filterValue = [];
      this.allSelected = false;
    } else {
      this.filterValue = this.filters;
      this.allSelected = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-list {
  padding: 0;
  list-style: none;
}

.filter__input {
  display: none;
}

.filter__item {
  user-select: none;
  display: flex;
  gap: 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }
}

.filter__checkbox {
  width: 20px;
  height: 20px;
  opacity: 0.5;
  border: 1px solid var(--color-accent);
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    opacity: 0;
  }

  &.checked {
    opacity: 1;
    position: relative;

    svg {
      opacity: 1;
    }
  }
}
</style>
