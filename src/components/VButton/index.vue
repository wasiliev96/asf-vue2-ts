<template>
  <button class="btn" :class="{'btn-primary':primary}">
    <slot/>
  </button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class VButton extends Vue {
  @Prop({required: false, default: false})
  primary?: boolean

  mounted() {
    console.log(this.primary);
  }
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
  color: var(--color-text);
}

.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-white);
}
</style>
