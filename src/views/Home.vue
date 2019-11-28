<template lang="pug">
  .container
    .camera-wrapper
      .top-bar
        SettingNav/
      Camera/
    .menu-wrapper
      Menu/
</template>

<script>
  import Camera from '@/components/Camera';
  import Menu from '@/components/Menu';
  import SettingNav from '@/components/SettingNav';
  export default {
    name: 'home',
    components: {
      Camera,
      Menu,
      SettingNav
    }
  }
</script>

<style lang="sass">
  .container
    height: auto
    width: auto
    .camera-wrapper
      .top-bar
        background-color: rgba(0,0,0,0.5)
        height: 45px
        width: 100%
        position: relative
        padding: 10px
        padding-left: 20px
        padding-right: 20px
        z-index: 2
    .menu-wrapper
      width: 49%


</style>
