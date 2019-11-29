<template lang="pug">
  .container
    .camera-wrapper
      .top-bar
        SettingNav/
        .wizzard-wrapper(v-if="isTraining")
          Wizard/
      Camera/
    .menu-wrapper(v-if="isMenuOpen")
      Menu/
</template>

<script>
  import Camera from '@/components/Camera';
  import Menu from '@/components/Menu';
  import SettingNav from '@/components/SettingNav';
  import Wizard from '@/components/Wizard';
  import {getConfiguration, setConfigured} from "@/utils/configuration";

  export default {
    name: 'home',
    components: {
      Camera,
      Menu,
      SettingNav,
      Wizard
    },
    data(){
      return {
        isMenuOpen: false,
        isTraining: false,
      }
    },
    mounted(){
      const {app} = require('electron').remote;
      app.on('menuToggled', () => {
        this.isMenuOpen = !this.isMenuOpen;
      });

      this.isTraining = !getConfiguration().IS_CONFIGURED
      const tmplog3 = getConfiguration().IS_CONFIGURED;
      console.log(tmplog3);
      if(this.isTraining) {
        const {app} = require('electron').remote;
        app.emit('toggle-training');
      }

      app.on('train-finished', () => {
        this.isTraining = !this.isTraining

        const tmplog = getConfiguration().IS_CONFIGURED;
        console.log(tmplog);
        setConfigured(true)
        const tmplog2 = getConfiguration().IS_CONFIGURED;
        console.log(tmplog2);

        app.emit('toggle-training');
      });

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
