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
      }else if(process.platform == 'win32'){
       action = new Action(actionName,'win32');
      }else {
       action = new Action(actionName,'linux');
       action.executeAction()
      }
    }
  }
}
</script>
