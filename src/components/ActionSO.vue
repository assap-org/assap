<template lang="pug">


</template>

<script>
import {Action} from "@/utils/actions";
const { globalShortcut } = require('electron').remote

export default {
  name: 'ActionSO',
  created() {

    globalShortcut.register('CommandOrControl+H', () => {
     const action = new Action("","");
     var actionName=action.getActionName()
     var isDefaultState=action.isDefaultState
     //If default state is false-> screen action done
     if(!isDefaultState){
      if(actionName){
        //DoStuff
        if(actionName!="lockscreen"){
          var reverseAction="reverse"+actionName;
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
