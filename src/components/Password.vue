<template lang="pug">
.container
  .div(v-if="isLogged")
    b-field(label="Password")
      b-input(v-model="userpass", type="password",required, minlength="6", validation-message="Minimum 6 characters",size="is-small")
    b-button(@click="checkPass()",size="is-small") Login
  .div(v-else)
    .register-wrapper
      b-field(label="Password")
        b-input(v-model="register1", type="password",required, minlength="6", validation-message="Minimum 6 characters",size="is-small")
      b-field(label="Repeat Password")
        b-input(v-model="register2", type="password",required, minlength="6", validation-message="Minimum 6 characters",size="is-small")
      b-button(@click="register()",size="is-small") Register
</template>

<script>
import {getUserPassword,setUserPassword,getUserStr,getConfiguration} from "@/utils/configuration";
import {encrypt,genRandomString,decrypt} from "@/utils/cipher";


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
    }
  },
  methods:{
    checkPass() {
      var savedPass = getUserPassword()
      var userStr = getUserStr()
      try {
        var decUserPass = decrypt(savedPass,this.userpass)
        if (userStr === decUserPass) {
          this.$emit("logginStatus",this.isLogged,this.userpass)
          this.$store.commit('setPass', this.userpass)
          var isConfigured = getConfiguration().isConfigured
          if (!isConfigured || isConfigured==undefined) {
            this.$root.$emit("InitialFacialConfiguration")
          }
        }
      } catch (err) {
        console.log(err)
        this.$buefy.toast.open({'message':'Bad Password','type': 'is-danger'})
      }
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
  .register-wrapper
    width: 100%
    height: 100%
    padding: 5px 10px
    .field
      margin-bottom: 0
      width: 100%
      .label
        margin-bottom: 0
    .button
      padding: 0
      height: 25px
      margin-top: 6px
      float: right
</style>
