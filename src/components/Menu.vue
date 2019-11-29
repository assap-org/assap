<template lang="pug">
b-tabs(expanded)
  b-tab-item(label="Alerts")
    b-tabs(expanded="expanded",size="is-small", position="is-left",vertical)
      b-tab-item(label="slack")
        section
          b-input(placeholder="Slack Url" v-model="url",size="is-small")
          b-button(size="is-small",@click="saveAlert({'SLACKURL':url})") Save
          b-button(size="is-small",@click="removeAlert({'SLACKURL':'','IS_SLACK_ACTIVE':false})") Remove
          b-switch(v-model="activatedSlack",@input="setAlertActive({'IS_SLACK_ACTIVE':activatedSlack})") Active
      b-tab-item(label="telegram")
        section
          b-input(placeholder="Token" v-model="token",size="is-small")
          b-input(placeholder="ChatID" v-model="chatId",size="is-small")
          b-button(size="is-small",@click="saveAlert({'TOKEN':token,'CHATID':chatId})") Save
          b-button(size="is-small",@click="removeAlert({'TOKEN':'','CHATID':'','IS_TELEGRAM_ACTIVE':false})") Remove
          b-switch(v-model="activatedTelegram",@input="setAlertActive({'IS_TELEGRAM_ACTIVE':activatedTelegram})") Active
      b-tab-item(label="email")
        section
          b-input(placeholder="Email" v-model="email",size="is-small")
          b-input(placeholder="Password" v-model="password",size="is-small" type="password")
          b-button(size="is-small",@click="saveAlert({'EMAIL':email,'PASSWORD':password})") Save
          b-button(size="is-small",@click="removeAlert({'EMAIL':'','PASSWORD':'','IS_MAIL_ACTIVE':false})") Remove
          b-switch(v-model="activatedMail",@input="setAlertActive({'IS_MAIL_ACTIVE':activatedMail})") Active
  b-tab-item(label="Identity") erwewr
  b-tab-item(label="Config")
    b-numberinput(v-model="seconds",@input="changeTimer()")

</template>

<script>
import {setAlertsConfig,getAlertsConfig} from "@/utils/configuration";
export default {
  name: 'Menu',
  data(){
    return {
      url : "",
      activatedSlack: false,
      activatedTelegram: false,
      chatId: "",
      token: "",
      email: "",
      password: "",
      activatedMail: false,
      seconds: 30
    }
  },
  mounted(){
    if (getAlertsConfig("ALARMTIME")!= undefined) {
      setAlertsConfig("ALARMTIME",this.seconds)
    } else {
      this.seconds = getAlertsConfig("ALARMTIME")
    }
    var alertsActive = ['IS_SLACK_ACTIVE','IS_MAIL_ACTIVE','IS_TELEGRAM_ACTIVE']
    alertsActive.forEach(obj => {
      var isActive = getAlertsConfig(obj)
      if (isActive != undefined) {
        if (obj == 'IS_SLACK_ACTIVE') {
            this.url = getAlertsConfig('SLACKURL')
            this.activatedSlack = isActive
        }
        if (obj == 'IS_MAIL_ACTIVE') {
            this.password = getAlertsConfig('PASSWORD')
            this.email = getAlertsConfig('EMAIL')
            this.activatedMail = isActive
        }
        if (obj == 'IS_TELEGRAM_ACTIVE') {
          this.chatId = getAlertsConfig('CHATID')
          this.token = getAlertsConfig('TOKEN')
          this.activatedTelegram = isActive
        }
      }
    })

  },
  methods:{
    changeTimer() {
      if (this.seconds != null) {
        if (isNaN(this.seconds)){
          this.seconds = 30
        }else{
          setAlertsConfig('ALARMTIME',this.seconds)
        }
      }
    },
    //If params are empty you can't enable alerts.
    setAlertActive(values) {
      Object.entries(values).forEach(([key, value]) => {
          if (value){
            if (key == 'IS_SLACK_ACTIVE') {
              if (this.url != "") {
                setAlertsConfig(key,value)
              }
            }
            if (key == 'IS_MAIL_ACTIVE') {
              if (this.password != "" && this.email != "") {
                setAlertsConfig(key,value)
              }
            }
            if (key == 'IS_TELEGRAM_ACTIVE') {
              if (this.token != "" && this.chatId != "") {
                setAlertsConfig(key,value)
              }
            }

          } else {
            setAlertsConfig(key,value)
          }

        });
    },
    saveAlert(values) {
      Object.entries(values).forEach(([key, value]) => {
          setAlertsConfig(key,value)
        });
    },
    //If you remove the alert you also deactivate the alert
    removeAlert(values) {
      Object.entries(values).forEach(([key, value]) => {
        setAlertsConfig(key,value)
        if (key == 'IS_SLACK_ACTIVE') {
            this.url = ""
            this.activatedSlack = false
        }
        if (key == 'IS_MAIL_ACTIVE') {
            this.password = ""
            this.email = ""
            this.activatedMail = false
        }
        if (key == 'IS_TELEGRAM_ACTIVE') {
          this.chatId = ""
          this.token = ""
          this.activatedTelegram = false
        }
      })
    },
    identification() {
      console.log('identification')
    }

  }
}
</script>

<style lang="sass">

</style>
