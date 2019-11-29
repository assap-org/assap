<template lang="pug">
section
  .div(v-if="isLogged")
    b-field( label="Password")
      b-input(v-model="userpass", type="password",required, minlength="6", validation-message="Minimum 6 characters",size="is-small")
    b-button(@click="checkPass()") Login
  .div(v-else)
    b-field(label="Password")
      b-input(v-model="register1", type="password",required, minlength="6", validation-message="Minimum 6 characters",size="is-small")
    b-field(label="Repeat Password")
      b-input(v-model="register2", type="password",required, minlength="6", validation-message="Minimum 6 characters",size="is-small")
    b-button(@click="register()",size="is-small") Register
</template>

<script>
import {getUserPassword,setUserPassword} from "@/utils/configuration";
import {encrypt,genRandomString} from "@/utils/cipher";
export default {
  name: 'Password',
  data(){
    return {
      "userpass": null,
      "isLogged": false,
      "register1": null,
      "register2": null,
    }
  },
  mounted(){
    var userpass = getUserPassword()
    if (userpass != undefined) {
      this.isLogged = true
    } else {
      console.log("need to login")
    }
  },
  methods:{
    checkPass() {
      return true
    },
    register() {
      if (this.register1 == this.register2) {
        if (this.register1.length >= 6) {
          var secTex = genRandomString(16)
          setUserPassword(encrypt(secTex,this.register1),secTex)
          this.isLogged = true
        }
      }
    }
  }
}
</script>

<style lang="sass">

</style>
