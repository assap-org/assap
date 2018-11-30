<template lang="pug">
  .wrapper
    .control-wrapper
      #control-icon(v-if="isRecording")
        font-awesome-icon.stop(:icon="['fas', 'stop-circle']", @click="toggleRecord()")/
      #control-icon(v-if="!isRecording")
        font-awesome-icon.exit(:icon="['fas', 'power-off']", @click="exitRecord()")/
        font-awesome-icon.resume(:icon="['fas', 'play-circle']", @click="toggleRecord()")/
    .settings-wrapper
      #control-icon(v-if="!isSettings")
        font-awesome-icon.settings(:icon="['fas', 'sliders-h']", @click="toggleSettings()")/
    Camera/
</template>

<script>
  import Camera from '@/components/Camera';

  export default {
    name: 'home',
    components: {
      Camera
    },
    data() {
      return {
        isRecording: true,
        isSettings: false,
      };
    },
    methods: {
      toggleRecord(){
        this.isRecording = !this.isRecording
      },
      toggleSettings() {
        this.isSettings = !this.isSettings
      },
      exitRecord(){
        console.log("Shut-down")
      }
    }
  }
</script>

<style lang="sass">
.wrapper
  width: 100%
  height: 100%
  margin: 0
  padding: 0
.control-wrapper
  position: absolute
  z-index: 2
  top: 10px
  left: 10px
  height: 25px
  width: 25px
.settings-wrapper
  position: absolute
  z-index: 2
  top: 10px
  right: 10px
  height: 25px
  width: 25px
#control-icon:hover
  cursor: pointer
#control-icon
  color: rgb(255, 69, 58)
  cursor: pointer
  height: 25px
  svg
    border-radius: 50%
    width: 100%
    height: 100%
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

</style>
