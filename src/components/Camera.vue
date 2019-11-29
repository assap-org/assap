<template lang="pug">
div
  .section
    video(@play="onPlay", id="camera", width="270", height="150", preload, autoplay, loop, muted)
    canvas(id="canvas", width="270", height="150")
  .wrapper
    .play(v-if="!isRecording && !isTraining")
      font-awesome-icon.resume(:icon="['fas', 'play-circle']", @click="toggleRecord()")/
</template>

<script>
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
    },
    data() {
      return {
        isRecording: true,
        error: false,
        isTraining: false,
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

      const {app} = require('electron').remote;
      app.on('toggle-record', () => {
        this.toggleRecord()
      });

      app.on('toggle-training', () => {
        this.isTraining = !this.isTraining;
      });

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
            //Minimum size of the detected face to consider a shoulder surfing attack.
            //It prevents from false positives from people situated far from the current device.
            const minHeadHeight = 50
            var trueDetectionsNumber = detections.length
            var trueDetections = []
            for (var i = 0; i < detections.length; i++) {
              var box = detections[i].box
              if(box != undefined) {
                if (box.height<minHeadHeight) {
                  trueDetectionsNumber -= 1
                } else {
                  trueDetections.push(detections[i])
                }
              }

            }
            if(trueDetectionsNumber>1){
               action.executeAction()
            }
            canvas.width = videoEl.width
            canvas.height = videoEl.height
            const dims = faceapi.matchDimensions(canvas, videoEl, true)
            faceapi.draw.drawDetections(canvas, faceapi.resizeResults(trueDetections, dims))
          })
          .catch((error) => {
            console.log('Error', error); // eslint-disable-line no-console
          })

        setTimeout(() => this.onPlay())
      },
      toggleRecord(){
        this.isRecording = !this.isRecording
        const {app} = require('electron').remote;
        app.emit('play');
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
    width: 270px
    height: 100%
    margin: 0
    padding: 0
    position: absolute
    top: 0
    left: 0
    -webkit-app-region: drag

</style>
