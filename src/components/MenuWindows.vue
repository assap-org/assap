<template lang="pug">
 .menuWindows-container
   .div(v-bind:is="component",@logginStatus="processLogginState")
</template>

<script>
import Menu from '@/components/Menu';
import Password from '@/components/Password';

export default {
  name: 'MenuWindows',
  components: {
    Menu,
    Password
  },
  data(){
    return {
      component: Password,
    }
  },
  mounted(){


  },
  methods:{
    processLogginState(status) {
      if (status) {
        this.component = Menu
      }
    }
  }
}
</script>

<style lang="sass">
  .menuWindows-container
    height: 150px
    overflow: hidden
    width: 100%
</style>
