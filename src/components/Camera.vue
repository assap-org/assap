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
            font-awesome-icon.inline.resume(:icon="['fas', 'play-circle']", @click="toggleRecord()")/
      .settings-wrapper
        #control-icon(v-if="!isSettings")
          font-awesome-icon.settings(:icon="['fas', 'sliders-h']", @click="toggleSettings()")/
        #control-icon(v-if="isSettings")
          font-awesome-icon.settings(:icon="['fas', 'times']", @click="toggleSettings()")/
    .menu(v-if="isSettings")
      SettingNav/
</template>

<script>
  import * as faceapi from 'face-api.js'
  import * as fs from 'fs'
  import SettingNav from '@/components/SettingNav';
  import {Action} from "@/utils/actions";
  const { globalShortcut } = require('electron').remote
  import {getConfiguration} from "@/utils/configuration";
  const action = new Action()

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
        })
        .catch((error) => {
          console.log('Error!', error);
        })

      const model_url = getConfiguration().model_url
      console.log(model_url)

      faceapi.loadSsdMobilenetv1Model(model_url)
        .then(() => console.log('loaded ssd model!'))
        .catch((error) => console.error(error))
      faceapi.loadTinyFaceDetectorModel(model_url)
        .then(() => console.log('loaded tiny model!'))
        .catch((error) => console.error(error))
    },
    created(){
      globalShortcut.register('CommandOrControl+H', () => {
        console.log("reverse")
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
		  console.log(detections)
            if(detections.length>1){
               action.executeAction()
            }
            canvas.width = videoEl.width
            canvas.height = videoEl.height
            const detectionsForSize = detections.map(det => det.forSize(videoEl.width, videoEl.height))
            faceapi.drawDetection(canvas, detectionsForSize, { withScore: true })
          })
          .catch((error) => {
            console.log('Error', error);
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
              console.log('Error!', error);
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
</style>
