<template>
  <svg :class="svgClass">
    <use :href="iconHref"/>
  </svg>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class SvgIcon extends Vue {
  @Prop({})
  iconName?: string
  @Prop({})
  className?: string

  get iconHref(): string {
    return `#icon-${this.iconName}`
  }

  get svgClass(): string {
    if (this.className) {
      return 'svg-icon ' + this.className
    } else {
      return 'svg-icon'
    }
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
