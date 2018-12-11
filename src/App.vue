<template lang="pug">
  div(id="app")
    router-view/
</template>

<script>
export default {
  name: 'app'
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
