<template lang="pug">
  div(id="app")
    Bar/
    .content
      router-view/
</template>

<script>
import Bar from '@/components/Bar'

export default {
  name: 'app',
  components: {
    Bar
  }
}
</script>

<style lang="sass">
@import @/assets/styles.sass
#app
  height: 100%
  width: 100%
  border: 0
  background-color: $body-background-color
  color: black
</style>
