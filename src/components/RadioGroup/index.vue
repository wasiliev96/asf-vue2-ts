<template>
  <div class="radio-group">
    <label class="radio" v-for="(item, index) in items" :key="`${item.title}${index}`">
      <input class="radio__input" type="radio" :value="item.value" v-model="groupValue"/>
      <div class="radio__item"
           :class="{'active':item.value===groupValue}"
      >
        {{ item.title }}
      </div>
      <!-- /.radio -->
    </label>
  </div>
  <!-- /.button-group -->
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

interface SelectType extends HTMLButtonElement {
  title: string,
  value: string
}

@Component({
  name: 'RadioGroup',
})
export default class RadioGroup extends Vue {
  @Prop({required: true})
  items!: SelectType[]
  @Prop({required: true})
  value!: string


  get groupValue() {
    return this.value
  }

  set groupValue(value) {
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
  padding: 15px;
  font-size: 12px;
  text-align: center;

  &.active {
    background-color: var(--color-accent);
    color: var(--color-white);
  }
}
</style>
