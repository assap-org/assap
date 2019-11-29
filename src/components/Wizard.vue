<template lang="pug">
  .wizard-container
    .wizard-wrapper( class="step1" v-if="isStep1")
      .button-wrapper
        button(@click="toStep2()") Continuar
    .wizard-wrapper.step2(v-if="isStep2")
      .button-wrapper
        button(@click="toStep3()") Continuar
    .wizard-wrapper.step3(v-if="isStep3")
      .button-wrapper
        button(@click="toStep3()") Continuar
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
    toStep2(){
      this.isStep1 = false
      this.isStep2 = true
    },
    toStep3(){
      this.isStep2 = false
      this.isStep3 = true
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
      background-color: rgba(125,125,125,0.5)
      display: table

      .button-wrapper
        display: table-cell
        text-align: right
        vertical-align: bottom

    .step1
      background-image: url('../assets/focus.png')
      background-repeat: no-repeat
      background-position: 50% 10%
    .step2
      background-color: grey
    .step3
      background-color: red
</style>
