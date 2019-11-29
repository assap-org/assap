<template lang="pug">
  .container
    .camera-wrapper
      .top-bar
        SettingNav/
      Camera/
    .menu-wrapper(v-if="isMenuOpen")
      Password/
</template>

<script>
  import Camera from '@/components/Camera';
  //import Menu from '@/components/Menu';
  import SettingNav from '@/components/SettingNav';
  import Password from '@/components/Password';
  export default {
    name: 'home',
    components: {
      Camera,
      //Menu,
      SettingNav,
      Password
    },
    data(){
      return {
        isMenuOpen: false,
      }
    },
    mounted(){
      const {app} = require('electron').remote;
      app.on('menuToggled', () => {
        this.isMenuOpen = !this.isMenuOpen;
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
        padding: 10px
        padding-left: 20px
        padding-right: 20px
        z-index: 2
    .menu-wrapper
      background-color: white
      float: right
      width: 49%
      height: 100%
      z-index: 2


</style>
