<template lang="pug">
div
  .camera-section
    img(id="img", width="270", height="150")
    video(@play="onPlay", id="camera", width="270", height="150", preload, autoplay, loop, muted)
    canvas(id="canvas", width="270", height="150")
  .wrapper
    .play(v-if="!isRecording && !isTraining")
      font-awesome-icon.resume(:icon="['fas', 'play-circle']", @click="startRecord()")/
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
        userpass: null,
        checkIdentity: false,
        isMinimized: false,
        falsePositivesThreshold: 0,
        toastTimerMiliSec: 5000,
        lastTimeMiliSec: 0
      };
    },
    mounted() {
      this.isRecording = getConfiguration().isConfigured

      this.$root.$on("userPassToCipher",(userpass)=>{
        this.userpass = userpass
      })

      this.alertsTimer = Math.floor(Date.now() / 1000) //timestamp in seconds
      const videoEl = document.getElementById('camera');
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
          videoEl.srcObject = stream
          this.track = stream.getTracks()[0];
          this.stopRecord()
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

      app.on('cam-start-training', () => {
        this.isTraining = true
        if(!this.isRecording) {
          this.startRecord()
        }
      });

      app.on('cam-stop-training', () => {
        this.isTraining = false
        if(this.isRecording) {
          this.stopRecord()
        }
      });

      app.on('cam-start-record', () => {
        if(!this.isRecording) {
          this.startRecord()
        }
      });

      app.on('cam-stop-record', () => {
        if(this.isRecording) {
          this.stopRecord()
        }
      });

      app.on('cam-snapshot', () => {
        this.takeSnapshot = true
      });

      app.on('cam-check', () => {
        this.checkIdentity = true
        this.isTraining = true
        if(!this.isRecording) {
          this.startRecord()
        }
      });

    },
    created(){
      globalShortcut.register('CommandOrControl+H', () => {

        console.log("reverse") // eslint-disable-line no-console
        action.reverseAction()
      }),
      globalShortcut.register('CommandOrControl+M', () => {
        const remote = require('electron').remote
        console.log(this.isMinimized)
        var window = remote.getCurrentWindow()
        if(!this.isMinimized) {
          window.minimize()
          this.isMinimized = true
          console.log("minimize") // eslint-disable-line no-console
        }else {
          window.restore()
          this.isMinimized = false
          console.log("maximize") // eslint-disable-line no-console
        }
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
              const descriptorsList = retrieveDescriptors(this.userpass)
              this.identify(img, descriptorsList, "owner").then(isOwner => {
                if(isOwner) {
                  this.checkIdentity = false
                  app.emit('identify-ok');
                } else {
                  app.emit('identify-fail');
                }
              }).catch(error => {
                console.log('error', error)
              }) //TODO Make Dinamic label
            }

            console.log(trueDetectionsNumber)
            console.log(!this.checkIdentity)
            if(trueDetectionsNumber == 1 && !this.checkIdentity) {
              console.log("continous detection")
              this.screenshot(canvas, videoEl, img);
              const descriptorsList = retrieveDescriptors(this.userpass)
              this.identify(img, descriptorsList, "owner").then(isOwner => {
                console.log('owner', isOwner)
                if(!isOwner) {
                  this.falsePositivesThreshold = this.falsePositivesThreshold + 1
                  var now = Math.floor(Date.now() / 1000)
                  if(this.lastTimeMiliSec == 0 ) this.lastTimeMiliSec = now
                  var isTime = (now - this.lastTimeMiliSec) >= 5
                  if(this.falsePositivesThreshold >= 5 && isTime){
                    this.lastTimeMiliSec = 0
                    this.$buefy.toast.open({'message':'YOU ARE NOT OWNER','type': 'is-danger'})
                  }
                } else {
                  this.falsePositivesThreshold = 0
                }
              }).catch(error => {
                console.log('error', error)
              })
            }

            if(trueDetectionsNumber>1 && !this.checkIdentity){
               action.executeAction()
               var now = Math.floor(Date.now() / 1000)
               if(now - this.alertsTimer > getAlertsConfig("ALARMTIME")){
                 this.alertsTimer = now
                 var isActiveSlack = getAlertsConfig('IS_SLACK_ACTIVE')
                 var isActiveTelegram = getAlertsConfig('IS_TELEGRAM_ACTIVE')
                 var isActiveMail = getAlertsConfig('IS_MAIL_ACTIVE')
                 if (isActiveSlack) {
                   sendSlack(getAlertsConfig('SLACKURL'),"Be careful someone can be spying on you!")
                 }
                 if (isActiveTelegram) {
                   if (this.bot == null) {
                     this.bot = new TelegramBot(getAlertsConfig('TOKEN'), {polling: true});
                   }
                   sendTelegram(this.bot,getAlertsConfig('CHATID'),"Be careful someone can be spying on you!")
                 }
                 if (isActiveMail) {
                   sendMail(getAlertsConfig('EMAIL'), getAlertsConfig('PASSWORD'), getAlertsConfig('EMAIL'), "Shoulder Sourfing From ASSAP", "<p>Be careful someone can be spying on you!</p>", null)
               }
             }
            }

            canvas.width = videoEl.width
            canvas.height = videoEl.height
            if(canvas.height > 0 && canvas.height > 0 ) {
              const dims = faceapi.matchDimensions(canvas, videoEl, true)
              faceapi.draw.drawDetections(canvas, faceapi.resizeResults(trueDetections, dims))
            }
          })
          .catch((error) => {
            console.log('Error', error); // eslint-disable-line no-console
          })

        setTimeout(() => this.onPlay())
      },
      startRecord(){
        const {app} = require('electron').remote;
        this.isRecording = true
        const videoEl = document.getElementById('camera');
        navigator.mediaDevices.getUserMedia({ video: {} })
          .then((stream) => {
            videoEl.srcObject = stream
            this.track = stream.getTracks()[0];
            app.emit('nav-start-record');
          })
          .catch((error) => {
            console.log('Error!', error); // eslint-disable-line no-console
          })
      },
      stopRecord(){
        const {app} = require('electron').remote;
        this.isRecording = false
        this.track.stop()
        app.emit('nav-stop-record');
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
                  saveDescriptors(json,this.userpass);
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
