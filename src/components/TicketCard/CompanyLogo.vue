<template>
  <div class="company-logo">

    <transition name="fade" mode="out-in">

      <img
          loading="lazy"
          height="36"
          width="99"
          :src="logoUrl"
          :alt="iata"
          class="img"
          v-if="showedBlock === 'image'"
          key="image"
      >

      <div v-if="showedBlock==='placeholder'" class="placeholder" key="placeholder">
        <p v-text="iata"/>
      </div>

    </transition>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {getCompanyLogo} from "@/services/AviaSalesService";

@Component({
  name: 'CompanyLogo'
})
export default class CompanyLogo extends Vue {
  @Prop({required: true})
  iata!: string
  showedBlock: 'image' | 'placeholder' = 'placeholder';
  logoUrl: string | null = null;

  requestCardLogo(): void {
    const urlCreator = window.URL || window.webkitURL;

    getCompanyLogo(this.iata)
        .then(res => {
          this.logoUrl = urlCreator.createObjectURL(res.data);
          this.showedBlock = 'image';
        })
        .catch(error => {
          console.error(error)
        })
  }

  created(): void {
    this.requestCardLogo()
  }
}

</script>

<style lang="scss" scoped>
.company-logo {
  display: flex;
  justify-content: center;
  align-items: center;

  img.hidden {
    visibility: hidden;
  }

  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 99px;
    height: 36px;
    text-align: center;
  }
}

//animation
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s ease;
}

.fade-enter, .fade-leave-to
  /* .component-fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}
</style>
