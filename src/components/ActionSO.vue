<template lang="pug">
 div
  a(class='button', @click.prevent='execAction("lockscreen")') Action

</template>

<script>
import {Action} from "@/utils/actions";

export default {
  name: 'ActionSO',
  methods: {
    execAction(actionName){
      

      if (process.platform == 'darwin') {
       var action = new Action(actionName,'darwin');
      }else if(process.platform == 'win32'){
        var action = new Action(actionName,'win32');
      }else {
        var action = new Action(actionName,'linux');
        action.executeAction()
      }
    }
  }
}
</script>
