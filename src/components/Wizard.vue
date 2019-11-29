<template lang="pug">
  .wizard-container
    .wizard-wrapper( class="step1" v-if="isStep1")
      .button-wrapper
        button(@click="goTraining()") Start!
    .wizard-wrapper( class="step2" v-if="isStep2")
      .button-wrapper
        button(@click="train()") Train!
    .wizard-wrapper( class="step3" v-if="isStep3")
      .button-wrapper
        button(@click="checkTraining()") Verify!
    .wizard-wrapper( class="stepRepeat" v-if="isStepRepeat")
      .button-wrapper
        button(@click="goTraining()") Repeat!
    .wizard-wrapper( class="stepOk" v-if="isStepOk")
      .button-wrapper
        button(@click="endTraining()") End!
</template>

<script>

export default {
  name: 'Wizard',
  data(){
    return {
      isStep1: true,
      isStep2: false,
      isStep3: false,
      isStepRepeat: false,
      isStepOk: false
    }
  },
  mounted(){

    const {app} = require('electron').remote;

    app.on('identify-ok', () => {
      this.isStep1 = false
      this.isStep2 = false
      this.isStep3 = false
      this.isStepRepeat = false
      this.isStepOk = true
    });

    app.on('identify-fail', () => {
      this.isStep1 = false
      this.isStep2 = false
      this.isStep3 = false
      this.isStepRepeat = true
      this.isStepOk = false
    });

  },
  methods:{
    goTraining(){
      this.isStep1 = false
      this.isStep2 = true
      this.isStep3 = false
      this.isStepRepeat = false
      this.isStepOk = false
    },
    train(){
      this.isStep1 = false
      this.isStep2 = false
      this.isStep3 = true
      this.isStepRepeat = false
      this.isStepOk = false
      const {app} = require('electron').remote;
      app.emit('snapshot');
    },
    checkTraining(){
      const {app} = require('electron').remote;
      app.emit('check');
    },
    endTraining(){
      this.isStep1 = false
      this.isStep2 = false
      this.isStep3 = false
      this.isStepRepeat = false
      this.isStepOk = false
      const {app} = require('electron').remote;
      app.emit('train-finished');
    }
  }
}
</script>

<style lang="sass">
  .wizard-container
    height: 100%
    width: 100%
    .wizard-wrapper
      width: 100%
      height: 100%
      position: relative
      margin: 0
      padding: 0
      display: table

      .button-wrapper
        display: table-cell
        text-align: right
        vertical-align: bottom
        padding-right: 10px
        padding-bottom: 5px

    .step1
      background-image: url('../assets/setup1.png')
      background-size: 270px 105px
      background-repeat: no-repeat
      background-position: 50% 10%
    .step2
      background-image: url('../assets/setup2.png')
      background-size: 270px 105px
      background-repeat: no-repeat
      background-position: 50% 10%
    .step3
      background-image: url('../assets/setup3.png')
      background-size: 270px 105px
      background-repeat: no-repeat
      background-position: 50% 10%
    .stepRepeat
      background-image: url('../assets/setupRepeat.png')
      background-size: 270px 105px
      background-repeat: no-repeat
      background-position: 50% 10%
    .stepOk
      background-image: url('../assets/setupOK.png')
      background-size: 270px 105px
      background-repeat: no-repeat
      background-position: 50% 10%
</style>
