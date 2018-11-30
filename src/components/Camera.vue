<template lang="pug">
  .section
    video(@play="onPlay", id="camera", width="320", height="240", preload, autoplay, loop, muted)
    canvas(id="canvas", width="320", height="240")
</template>

<script>
  import * as faceapi from 'face-api.js'
  import * as fs from 'fs'

  export default {
    name: 'camera',
    mounted() {
      const videoEl = document.getElementById('camera');
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
          videoEl.srcObject = stream
        })
        .catch((error) => {
          console.log('Error!', error);
        })

      faceapi.loadSsdMobilenetv1Model('https://github.com/assap-org/models/releases/download/1.0.0')
        .then(() => console.log('loaded ssd model!'))
        .catch((error) => console.error(error))
      faceapi.loadTinyFaceDetectorModel('https://github.com/assap-org/models/releases/download/1.0.0')
        .then(() => console.log('loaded tiny model!'))
        .catch((error) => console.error(error))
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
            canvas.width = videoEl.width
            canvas.height = videoEl.height
            const detectionsForSize = detections.map(det => det.forSize(videoEl.width, videoEl.height))
            faceapi.drawDetection(canvas, detectionsForSize, { withScore: true })
          })
          .catch((error) => {
            console.log('Error', error);
          })

      setTimeout(() => this.onPlay())
      }
    }
  }
</script>

<style lang="sass">
  video, canvas
    position: absolute
    margin: 0
</style>
