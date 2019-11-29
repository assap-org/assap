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
        button(@click="checkTraining()") Check It!
</template>

<script>

export default {
  name: 'Wizard',
  data(){
    return {
      isStep1: true,
      isStep2: false,
      isStep3: false
    }
  },
  mounted(){
  },
  methods:{
    goTraining(){
      this.isStep1 = false
      this.isStep2 = true
    },
    train(){
      this.isStep2 = false
      this.isStep3 = true
      const {app} = require('electron').remote;
      app.emit('snapshot');
    },
    checkTraining(){
      const isCheckOk = true //TODO get real check
      if(isCheckOk){
        const {app} = require('electron').remote;
        app.emit('train-finished');
      } else {
        this.isStep1 = true
        this.isStep2 = false
        this.isStep3 = false
      }
      console.log("TODO")
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
