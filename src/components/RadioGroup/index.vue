<template>
  <div class="radio-group">

    <label class="radio" v-for="(item, index) in items" :key="`${item.title}${index}`">
      <input class="radio__input" type="radio" :value="item.value" v-model="groupValue"/>
      <div class="radio__item"
           :class="{'active':item.value===groupValue}"
      >
        {{ item.title }}
      </div>
    </label>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {SelectType} from "@/types";


@Component({
  name: 'RadioGroup',
})
export default class RadioGroup extends Vue {
  @Prop({required: true})
  items!: SelectType[]
  @Prop({required: true})
  value!: string


  get groupValue(): string {
    return this.value
  }

  set groupValue(value: string) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-white);
  border: 1px solid var(--color-divider);
}

.radio {
  flex: 1 1 auto;
  cursor: pointer;
  user-select: none;

  &:not(:last-child) {
    .radio__item {
      border-right: 1px solid var(--color-divider);
    }
  }
}

.radio__input {
  display: none;
}

.radio__item {
  height: 100%;
  padding: 15px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;

  &.active {
    background-color: var(--color-accent);
    color: var(--color-white);
  }
}
</style>
