<template lang="pug">
    Camera/
</template>

<script>
  import Camera from '@/components/Camera';

  export default {
    name: 'home',
    components: {
      Camera
    },
    methods: {

    }
  }
</script>

<style lang="sass">
.wrapper
  width: 100%
  height: 100%
  margin: 0
  padding: 0
  position: absolute
  top: 0
  left: 0
  -webkit-app-region: drag
.top-bar
  position: relative
  background-color: rgba(0,0,0,0.5)
  height: 45px
  z-index: 2
.control-wrapper
  position: relative
  float: left
  top: 10px
  left: 10px
  height: 25px
  width: 50px
.settings-wrapper
  position: relative
  float: right
  margin-top: 10px
  margin-right: 10px
  height: 25px
  width: 25px
#control-icon:hover
  cursor: pointer
#control-icon.double
  width: 55px
  svg
    margin-right: 5px
#control-icon
  -webkit-app-region: no-drag
  color: rgb(255, 69, 58)
  cursor: pointer
  height: 25px
  width: 25px
  svg
    border-radius: 50%
    width: 100%
    height: 100%
  svg.inline
    display: inline-block
    width: 40%
  svg.stop:hover
    color: rgb(201, 52, 0)
  svg.resume:hover
    color: rgb(0, 125, 27)
  svg.exit:hover
    color: rgb(201, 52, 0)
  svg.stop
    color: rgb(255, 69, 58)
  svg.resume
    color: rgb(40, 205, 65)
  svg.exit
    color: rgb(255, 69, 58)
  svg.settings
    color: rgb(142, 142, 147)
  svg.settings:hover
    color: rgb(105, 105, 110)
.menu
  position: absolute
  right: 0
  top: 0
  z-index: 1
  width: 200px
  height: 100%

</style>
