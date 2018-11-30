<template lang="pug">
  .setting-nav
    .settings-header
      h1
        | Settings
    .options
      .opt-section
        span
          | Train Model
      .opt-section
        span
          | Load loadURL
      .opt-section
        span
          | Actions
</template>

<script>

export default {
  name: 'SettingNav',
}
</script>

<style lang="sass">
  .setting-nav
    -webkit-app-region: no-drag
    background-color: rgba(142,142,147,1)
    width: 100%
    height: 150px
    overflow-y: scroll
    border-left: 2px solid rgba(105,105,110,0.9)

    .settings-header
      position: fixed
      top: 0
      padding: 10px
      width: 100%
      height: 45px
      background-color: rgb(105,105,110)
      h1
        font-weight: bold
        color: white
  .options
    width: 100%
    margin: 0
    margin-top: 30px
    padding: 10px
  .opt-section
    margin-top: 15px
    span
      font-weight: bold
      color: white

</style>
