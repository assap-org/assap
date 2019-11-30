<template lang="pug">
  .container
    .camera-wrapper
      .top-bar
        SettingNav/
        .wizzard-wrapper(v-if="isTraining")
          Wizard/
      Camera/
    .menu-wrapper(v-if="isMenuOpen")
      MenuWindows/
</template>

<script>
  import Camera from '@/components/Camera';
  import MenuWindows from '@/components/MenuWindows';
  import SettingNav from '@/components/SettingNav';
  import Wizard from '@/components/Wizard';
  import {getConfiguration, setConfigured} from "@/utils/configuration";

  export default {
    name: 'home',
    components: {
      Camera,
      MenuWindows,
      SettingNav,
      Wizard,
    },
    methods: {
      setFacialConfiguration() {
        const {app} = require('electron').remote;
        this.isTraining = !getConfiguration().isConfigured

        if(this.isTraining) {
          const {app} = require('electron').remote;
          app.emit('toggle-training');
        }

        app.on('train-finished', () => {
          this.isTraining = !this.isTraining
          setConfigured(true)
          app.emit('toggle-training');
        });
      }
    },
    data(){
      return {
        isMenuOpen: false,
        isTraining: false,
        userpass: null
      }
    },
    mounted(){
      const {app} = require('electron').remote;
      app.on('menuToggled', () => {
        this.isMenuOpen = !this.isMenuOpen;
      });

      this.$root.$on("InitialFacialConfiguration",()=>{
        this.setFacialConfiguration()
      })
    },
  }
</script>

<style lang="sass">
  .container
    height: 100%
    width: 100%
    .camera-wrapper
      float: left
      .top-bar
        background-color: rgba(0,0,0,0.5)
        height: 45px
        width: 270px
        position: relative
        z-index: 2

        .wizzard-wrapper
          width: 100%
          margin-top: 25px
          height: 105px

    .menu-wrapper
      background-color: white
      float: right
      width: 49%
      height: 100%
      z-index: 2

</style>
