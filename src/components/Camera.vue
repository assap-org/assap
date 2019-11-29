<template lang="pug">
div
  .camera-section
    img(id="img", width="270", height="150")
    video(@play="onPlay", id="camera", width="270", height="150", preload, autoplay, loop, muted)
    canvas(id="canvas", width="270", height="150")
  .wrapper
    .play(v-if="!isRecording && !isTraining")
      font-awesome-icon.resume(:icon="['fas', 'play-circle']", @click="toggleRecord()")/
</template>

<script>
  import * as faceapi from 'face-api.js';
  import {Action} from "@/utils/actions";
  import {sendSlack} from "@/utils/slack";
  import {sendTelegram} from "@/utils/telegram";
  import {sendMail} from "@/utils/mail"
  const { globalShortcut } = require('electron').remote
  import {getConfiguration, getAlertsConfig, saveDescriptors, retrieveDescriptors} from "@/utils/configuration";
  import {serialize} from "@/utils/descriptors";

  const action = new Action();
  const TelegramBot = require('node-telegram-bot-api');


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
        isRecording: false,
        error: false,
        isTraining: false,
        track: null,
        takeSnapshot: false,
        bot : null,
        alertsTimer: 0,
        checkIdentity: false,
      };
    },
    mounted() {
      this.isRecording = getConfiguration().isConfigured
      
      this.alertsTimer = Math.floor(Date.now() / 1000) //timestamp in seconds
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
      faceapi.loadFaceLandmarkModel(model_url)
        .then(() => console.log('loaded landmarks!')) // eslint-disable-line no-console
        .catch((error) => console.error(error))
      faceapi.loadFaceRecognitionModel(model_url)
        .then(() => console.log('loaded recognition!')) // eslint-disable-line no-console
        .catch((error) => console.error(error))

      const {app} = require('electron').remote;
      app.on('toggle-record', () => {
        this.toggleRecord()
      });

      app.on('toggle-training', () => {
        this.isTraining = !this.isTraining;

        const TRAINING_IS_STARTING = !this.isRecording && this.isTraining
        const TRAINING_IS_ENDING = !this.isTraining && this.isRecording

        if(TRAINING_IS_STARTING) {
          this.isRecording = true
          this.toggleRecord()
        }
        if(TRAINING_IS_ENDING){
          this.toggleRecord()
        }

      });

      app.on('snapshot', () => {
        this.takeSnapshot = true
      });

      app.on('check', () => {
        this.checkIdentity = true
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
        const img = document.getElementById('img')
        const {app} = require('electron').remote;

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

            if(trueDetectionsNumber == 1 && this.takeSnapshot) {
              this.takeSnapshot = false
              this.screenshot(canvas, videoEl, img);
              this.createId(img, "owner"); //TODO Make Dinamic
            }

            if(trueDetectionsNumber == 1 && this.checkIdentity) {
              this.screenshot(canvas, videoEl, img);
              const descriptorsList = retrieveDescriptors()
              this.identify(img, descriptorsList, "owner").then(isOwner => {
                if(isOwner) {
                  app.emit('identify-ok');
                } else {
                  app.emit('identify-fail');
                }
              }) //TODO Make Dinamic label
            }

            if(trueDetectionsNumber>1){
               action.executeAction()
               var now = Math.floor(Date.now() / 1000)
               if(now - this.alertsTimer > getAlertsConfig("ALARMTIME")){
                 this.alertsTimer = now
                 var isActiveSlack = getAlertsConfig('IS_SLACK_ACTIVE')
                 var isActiveTelegram = getAlertsConfig('IS_TELEGRAM_ACTIVE')
                 var isActiveMail = getAlertsConfig('IS_MAIL_ACTIVE')
                 if (isActiveSlack) {
                   sendSlack(getAlertsConfig('SLACKURL'),"Be careful someone can be spying you!")
                 }
                 if (isActiveTelegram) {
                   if (this.bot == null) {
                     this.bot = new TelegramBot(getAlertsConfig('TOKEN'), {polling: true});
                   }
                   sendTelegram(this.bot,getAlertsConfig('CHATID'),"Be careful someone can be spying you!")
                 }
                 if (isActiveMail) {
                   sendMail(getAlertsConfig('EMAIL'), getAlertsConfig('PASSWORD'), getAlertsConfig('EMAIL'), "Shoulder Sourfing From ASSAP", "<p>Be careful someone can be spying you!</p>", null)
               }
             } else {
               console.log('todavia no')
             }
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
      screenshot(canvas, videoEl, img) {
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;
        canvas.getContext('2d').drawImage(videoEl, 0, 0);
        img.src = canvas.toDataURL('image/webp');
      },
      createId(img, label){
        const {app} = require('electron').remote;
        faceapi.detectAllFaces(img)
              .withFaceLandmarks()
              .withFaceDescriptors()
              .then((results) => {
                if(results.length > 0) {
                  const json = serialize(results, label);
                  saveDescriptors(json);
                  console.log("Descriptor-Saved")
                  app.emit('descriptor-saved');
                }
              }).catch((error) => {
                console.log('error', error)
                app.emit('descriptor-not-saved');
              });
      },
      identify(img, descriptorsList, ownerLabel){
        return faceapi.detectAllFaces(img)
              .withFaceLandmarks()
              .withFaceDescriptors()
              .then((results) => {
                if(results.length > 0) {

                  const labeledDescriptors = descriptorsList.map(({descriptors, label}) => {
                    return new faceapi.LabeledFaceDescriptors(label, descriptors)
                  });

                  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)

                  let label = ""
                  results.forEach(({ descriptor }) => {
                      label = faceMatcher.findBestMatch(descriptor).toString()
                  })

                  console.log(label.split(" "))
                  console.log(ownerLabel)
                  if(label.split(" ")[0] === ownerLabel) {
                    return true
                  } else {
                    return false
                  }

                }
              }).catch((error) => {
                console.log("Detection error", error)
                return false
              });
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
    width: 270px
    height: 100%
    margin: 0
    padding: 0
    position: absolute
    top: 0
    left: 0
    -webkit-app-region: drag

</style>
