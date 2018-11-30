<template lang="pug">
 div
  a(class='button', @click.prevent='execAction("lowbrightness")') Action

</template>

<script>
import {Action} from "@/utils/actions";
const { globalShortcut } = require('electron').remote

export default {
  name: 'ActionSO',
  created() {

    globalShortcut.register('CommandOrControl+I', () => {
     console.log("detecta")
     const action = new Action("","");
     var actionName=action.getActionName()
     var isDefaultState=action.isDefaultState
     //If default state is false-> screen action done
     if(!isDefaultState){
      console.log("reverse state")
      if(actionName){
        //DoStuff
        if(actionName!="lockscreen"){
          const reverseAction="reverse"+actionName;
          action.executeAction(reverseAction)
        }
        
      }
     }


    })
  },
  methods: {
    execAction(actionName){
      var action=""
      if (process.platform == 'darwin') {
       action = new Action(actionName,'darwin');
       action.executeAction()
      }else if(process.platform == 'win32'){
       action = new Action(actionName,'win32');
       action.executeAction()
      }else {
       action = new Action(actionName,'linux');
       action.executeAction()
      }
    }
  }
}
</script>
