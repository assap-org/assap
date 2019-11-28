<template lang="pug">
div
  .section
    video(@play="onPlay", id="camera", width="270", height="150", preload, autoplay, loop, muted)
    canvas(id="canvas", width="270", height="150")
  .wrapper
    .top-bar
      .control-wrapper
        #control-icon(v-if="isRecording")
          font-awesome-icon.stop(:icon="['fas', 'stop-circle']", @click="toggleRecord()")/
        #control-icon.double.no-recording(v-if="!isRecording")
            font-awesome-icon.inline.exit(:icon="['fas', 'times-circle']", @click="exitRecord()")/
      .settings-wrapper
        SettingNav/
    .play(v-if="!isRecording")
      font-awesome-icon.resume(:icon="['fas', 'play-circle']", @click="toggleRecord()")/
</template>

<script>
  import SettingNav from '@/components/SettingNav';
  import * as faceapi from 'face-api.js';
  import {Action} from "@/utils/actions";
  const { globalShortcut } = require('electron').remote
  import {getConfiguration} from "@/utils/configuration";
  const action = new Action();

  faceapi.env.monkeyPatch({
    Canvas: HTMLCanvasElement,
    Image: HTMLImageElement,
    ImageData: ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement('canvas'),
    createImageElement: () => document.createElement('img')
  });

  export default {
    name: 'camera',
    components: {
      SettingNav
    },
    data() {
      return {
        isRecording: true,
        isSettings: false,
        text: 'Record',
        error: false,
        track: null
      };
    },
    mounted() {
      const videoEl = document.getElementById('camera');
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
          videoEl.srcObject = stream
          this.track = stream.getTracks()[0];
          this.toggleRecord()
        })
        .catch((error) => {
          console.log('Error!', error); // eslint-disable-line no-console
        })

      const model_url = getConfiguration().model_url

      faceapi.loadSsdMobilenetv1Model(model_url)
        .then(() => console.log('loaded ssd model!')) // eslint-disable-line no-console
        .catch((error) => console.error(error)) // eslint-disable-line no-console
      faceapi.loadTinyFaceDetectorModel(model_url)
        .then(() => console.log('loaded tiny model!')) // eslint-disable-line no-console
        .catch((error) => console.error(error)) // eslint-disable-line no-console
    },
    created(){
      globalShortcut.register('CommandOrControl+H', () => {
        console.log("reverse") // eslint-disable-line no-console
        action.reverseAction()
      })
    },
    methods: {
      // Based on code from
      // https://github.com/justadudewhohacks/face-api.js/blob/master/examples/examples-browser/views/webcamFaceTracking.html
      onPlay() {
        const videoEl = document.getElementById('camera')
        const canvas = document.getElementById('canvas')

        if(videoEl.paused || videoEl.ended)
          return setTimeout(() => this.onPlay())

        faceapi.detectAllFaces(videoEl)
          .then((detections) => {
            if(detections.length>1){
               action.executeAction()
            }
            canvas.width = videoEl.width
            canvas.height = videoEl.height
            const dims = faceapi.matchDimensions(canvas, videoEl, true)
            faceapi.draw.drawDetections(canvas, faceapi.resizeResults(detections, dims))
          })
          .catch((error) => {
            console.log('Error', error); // eslint-disable-line no-console
          })

        setTimeout(() => this.onPlay())
      },
      toggleRecord(){
        this.isRecording = !this.isRecording
        this.text = this.isRecording ? 'Stop' : 'Record'
        if(!this.isRecording) {
          this.track.stop()
        } else {
          const videoEl = document.getElementById('camera');
          navigator.mediaDevices.getUserMedia({ video: {} })
            .then((stream) => {
              videoEl.srcObject = stream
              this.track = stream.getTracks()[0];
            })
            .catch((error) => {
              console.log('Error!', error); // eslint-disable-line no-console
            })
        }
      },
      toggleSettings() {
        this.isSettings = !this.isSettings
      },
      exitRecord(){
        const remote = require('electron').remote
        let w = remote.getCurrentWindow()
        w.close()
      }
    }
  }
</script>

<style lang="sass">
  video, canvas
    position: absolute
    margin: 0
    padding: 0
    top: 0
    left: 0
    width: 270px
    height: 150px

  .play
    left: 33%
    right: 33%
    top: 40%
    position: absolute
    height: 33%
    width: 33%
    svg.resume
      -webkit-app-region: no-drag
      color: #28cd41
      height: 100%
      width: 100%
      cursor: pointer
    svg.resume:hover
      color: rgb(0, 125, 27)

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
    width: 100px

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
    svg.exit:hover
      color: rgb(201, 52, 0)
    svg.stop
      color: rgb(255, 69, 58)
    svg.exit
      color: rgb(255, 69, 58)

  .menu
    position: absolute
    right: 0
    top: 0
    z-index: 1
    width: 200px
    height: 100%
</style>
