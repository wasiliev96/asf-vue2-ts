<template>
  <div class="filter-bar">
    <p class="filter-bar__title">Количество пересадок</p>
    <!-- /.filter-bar__title -->
    <ul class="filter-list">
      <li class="filter"
      >
        <label class="filter__label">
          <input class="filter__input" type="checkbox" @change="toggleAllSelected()"
                 v-model="allSelectedCheckboxChecked"/>
          <div class="filter__item">
            <div class="filter__checkbox"
                 :class="{'checked':allSelectedCheckboxChecked}"
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
          <input class="filter__input" type="checkbox" :value="filter.value" v-model="filterValue"/>
          <div class="filter__item">
            <div class="filter__checkbox" :class="{'checked':!!filterValue.includes(filter.value)}">
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
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import SvgIcon from "@/components/SvgIcon/index.vue";
import {FilterType} from "@/store/types";


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
  value!: number[]

  allSelected = false
  allSelectedCheckboxChecked = false

  get filterValue(): number[] {
    return this.value
  }

  set filterValue(value: number[]) {
    if (value.length === this.filters.length) {
      this.allSelectedCheckboxChecked = true;
    }
    if (value.length <= this.filters.length - 1) {
      this.allSelectedCheckboxChecked = false;
    }
    this.$emit('input', value);
  }

  toggleAllSelected(): void {
    if (this.allSelectedCheckboxChecked) {
      this.filterValue = this.filters.map(filter => filter.value);
    } else {
      this.filterValue = this.filters.filter((filter: FilterType) => filter.active).map(filter => filter.value);
    }
  }
}
</script>

<style lang="scss" scoped>

.filter-bar {
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.filter-bar__title {
  text-transform: uppercase;
}

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
  padding: 10px 10px 10px 0;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }
}

.filter__checkbox {
  width: 20px;
  height: 20px;
  opacity: 0.3;
  border: 1px solid var(--color-accent);
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-accent);

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
