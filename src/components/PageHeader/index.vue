<template>
  <header class="page-header">
    <svg-icon icon-name="logo" class-name="logo"></svg-icon>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SvgIcon from "@/components/SvgIcon/index.vue";

@Component({
  name: "PageHeader",
  components: {
    SvgIcon
  }
})
export default class PageHeader extends Vue {

}
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 50px;
}

.logo {
  width: 60px;
  height: 60px;
}
</style>
