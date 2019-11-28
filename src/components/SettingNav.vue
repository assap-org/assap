<template lang="pug">
  .nav-wrapper
    .controls-wrapper
      #control-icon(v-if="!isRecordingNav")
        font-awesome-icon.stop(:icon="['fas', 'stop-circle']", @click="toggleRecordNav()")/
      #control-icon.double.no-recording(v-if="isRecordingNav")
        font-awesome-icon.inline.exit(:icon="['fas', 'times-circle']", @click="exitRecord()")/
      #control-icon
        font-awesome-icon.minimize(:icon="['fas', 'user-secret']", @click="minimize()")/
    .settings-wrapper
      .settings(v-if="!isMenuOpen")
          font-awesome-icon.inline.toOpen(:icon="['fas', 'bars']",@click="toggleMenu()")/
      .settings(v-if="isMenuOpen")
          font-awesome-icon.inline.toClose(:icon="['fas', 'times']",@click="toggleMenu()")/
      .select-wrapper
        select(@change="loadAction()",v-model="selectedAction")
          option(v-for="act in actionList" :selected="act == selectedAction ? true : false")
            | {{act}}
</template>

<script>
import {Action} from "@/utils/actions";
import {setAction, getConfiguration} from "@/utils/configuration";
export default {
  name: 'SettingNav',
  data(){
    return {
      isRecordingNav: false,
      selectedAction: "",
      actionList: ["No Options"],
      isMenuOpen: false,
    }
  },
  mounted(){
    const action = new Action("","")
    this.actionList = action.getAvailableActions()
    this.selectedAction = getConfiguration().action

    const {app} = require('electron').remote;
    app.on('play', () => {
      this.isRecordingNav = !this.isRecordingNav;
    });
  },
  methods:{
    loadAction(){
      setAction(this.selectedAction)
    },
    toggleMenu(){
      const {app} = require('electron').remote;
      const ipcRenderer = require('electron').ipcRenderer;
      ipcRenderer.send("toggleMenu");
      app.emit('menuToggled');
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleRecordNav(){
      const {app} = require('electron').remote;
      app.emit('toggle-record');
    },
    exitRecord(){
      const remote = require('electron').remote
      let w = remote.getCurrentWindow()
      w.close()
    },
    minimize() {
      const remote = require('electron').remote
      var window = remote.getCurrentWindow();
      window.minimize();
    }
  }
}
</script>

<style lang="sass">
  .nav-wrapper
    .controls-wrapper
      position: relative
      float: left
      height: 25px

      #control-icon
        -webkit-app-region: no-drag
        color: rgb(255, 69, 58)
        cursor: pointer
        height: 25px
        width: 25px
        svg
          border-radius: 50%
          width: 100%
          height: 100%
        svg.inline
          display: inline-block
          width: 40%
        svg.stop:hover
          color: rgb(201, 52, 0)
        svg.exit:hover
          color: rgb(201, 52, 0)
        svg.stop
          color: rgb(255, 69, 58)
        svg.exit
          color: rgb(255, 69, 58)

      #control-icon:hover
        cursor: pointer

      #control-icon.double
        width: 55px
        svg
          margin-right: 5px

    .settings-wrapper
      -webkit-app-region: no-drag
      float: right
      position: relative
      width: 70%

      .select-wrapper
        height: 100%
        width: 60%
        display: inline-block
        -webkit-app-region: no-drag
        float: right

      .settings
        -webkit-app-region: no-drag
        cursor: pointer
        height: 25px
        width: 25px
        display: inline-block
        float: right
        margin-right: 10%

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
