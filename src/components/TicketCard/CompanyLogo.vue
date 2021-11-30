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
        <p>...</p>
      </div>
      <!-- /.placeholder -->
    </transition>
  </div>
  <!-- /.company-logo -->
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {getCompanyLogo} from "@/services/AviaSalesService";

@Component({
  name: 'CompanyLogo'
})
export default class CompenyLogo extends Vue {
  @Prop({required: true})
  iata!: string
  showedBlock: 'image' | 'placeholder' = 'placeholder';
  logoUrl: string | null = null;

  requestCardLogo(): void {
    const urlCreator = window.URL || window.webkitURL;

    getCompanyLogo(this.iata)
        .then(res => {
          console.log(res);
          return res;
        })
        .then(res => {
          this.logoUrl = urlCreator.createObjectURL(res.data);
          setTimeout(() => {
            this.showedBlock = 'image';
          }, 3000)
        })
        .catch(error => console.error(error))
  }

  created(): void {
    this.requestCardLogo()
  }
}

</script>

<style lang="scss" scoped>
.company-logo {
  img.hidden {
    visibility: hidden;
  }

  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 99px;
    height: 36px;
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
