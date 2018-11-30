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
        form
          input(v-model="config.url")
          button(@click.prevent="loadURL()")
            | Load
      .opt-section
        span
          | Actions
</template>

<script>
import {Action} from "@/utils/actions";
import {setModelUrl,setAction} from "@/utils/configuration";
export default {
  name: 'SettingNav',
  data(){
    return {
      config: {
        url: "",
        action: "",
        actions: []
      }
    }
  },
  mounted(){
    const action = new Action("","");
    this.actions = action.getAvailableActions();
  },
  methods:{
    loadURL(){
      setModelUrl(this.config.url)
    }
  }


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
    form
      input
        margin-right: 5px

</style>
