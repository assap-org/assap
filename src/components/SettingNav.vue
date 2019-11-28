<template lang="pug">
  .setting-nav
    select(@change="loadAction()",v-model="selectedAction")
      option(v-for="act in actionList" :selected="act == selectedAction ? true : false")
        | {{act}}
    .menu(v-if="!isMenuOpen")
        font-awesome-icon.inline.toOpen(:icon="['fas', 'bars']",@click="toggleMenu()")/
    .menu(v-if="isMenuOpen")
        font-awesome-icon.inline.toClose(:icon="['fas', 'times']",@click="toggleMenu()")/
</template>

<script>
import {Action} from "@/utils/actions";
import {setAction, getConfiguration} from "@/utils/configuration";
export default {
  name: 'SettingNav',
  data(){
    return {
      selectedAction: "",
      actionList: ["No Options"],
      isMenuOpen: false,
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
    },
    toggleMenu(){
      const ipcRenderer = require('electron').ipcRenderer;
      ipcRenderer.send("toggleMenu");
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
</script>

<style lang="sass">
  .setting-nav
    -webkit-app-region: no-drag
    width: 100%
    select
      -webkit-app-region: no-drag
      display: inline-block
      width: 80%
    .menu
      -webkit-app-region: no-drag
      cursor: pointer
      height: auto
      width: 15%
      margin-left: 20px
      float: left
      display: inline-block
      svg
        border-radius: 50%
        width: 100%
        height: 100%
      svg.inline
        display: inline-block
      svg.toOpen
        color: rgb(125, 125, 125)
      svg.toClose
        color: rgb(201, 52, 0)
      svg.toOpen:hover
        color: rgb(125, 155, 175)
      svg.toClose:hover
        color: rgb(201, 52, 0)
</style>
