<template lang="pug">
 div
  a(class='button', @click.prevent='execAction("lowbrightness")') Action

</template>

<script>
import {Action} from "@/utils/actions";

export default {
  name: 'ActionSO',
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
