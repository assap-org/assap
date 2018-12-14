<template lang="pug">
  .setting-nav
    select(@change="loadAction()",v-model="selectedAction")
      option(v-for="act in actionList" :selected="act == selectedAction ? true : false")
        | {{act}}
</template>

<script>
import {Action} from "@/utils/actions";
import {setModelUrl, setAction, getConfiguration} from "@/utils/configuration";
export default {
  name: 'SettingNav',
  data(){
    return {
      selectedAction: "",
      actionList: ["No Options"]
    }
  },
  mounted(){
    const action = new Action("","")
    this.actionList = action.getAvailableActions()
    this.selectedAction = getConfiguration().action
  },
  methods:{
    loadAction(){
      setAction(this.selectedAction)
    }
  }
}
</script>

<style lang="sass">
  .setting-nav
    -webkit-app-region: no-drag
    width: 100%
    select
      display: block
      width: 100%
</style>
