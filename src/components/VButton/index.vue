<template>
  <button :class="['btn', primary && 'btn-primary']">
    <slot/>
  </button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class VButton extends Vue {
  @Prop({required: false, default: false})
  primary?: boolean
}
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  display: block;
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 15px 20px;
  background-color: var(--color-accent);
  color: var(--color-white);
}
</style>
