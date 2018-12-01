import {getConfiguration} from "@/utils/configuration";
import "../../node_modules/ion-sound/js/ion.sound.min.js";

export class Action {
  isActionDone=false;

  constructor() {
    this.actionName = getConfiguration().action;
    this.opsystem = process.platform;
    this.exec = require('child_process').exec;
    this.availableActions=["lockscreen","lowbrightness","notification","alarm"]
  }

  getActionName(){
    return this.actionName;
  }

  getAvailableActions(){
    return this.availableActions;
  }
  executeAction(){
   this.actionName = getConfiguration().action;
   if(!this.isActionDone){
    switch (this.actionName) {
     case "lockscreen": this.lockscreen(); break;
     case "lowbrightness": this.lowbrightness(); break;
     case "notification": this.notify(); break;
     case "alarm": this.alarm(); break;
    }
    if(!(this.opsystem=="linux" && this.actionName=="lockscreen")){
      this.isActionDone=true
    }
   }
  }

  reverseAction(){
    this.isActionDone=false
    switch(this.actionName){
     case "lowbrightness":this.reverselowbrightness();break;
    }
  }

  lowbrightness(){
  	const brightness=require('brightness')
    const windows='Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1,1)';
    const linux='xrandr --output $(xrandr -q | grep "connected" | head -n 1 | cut -d " " -f1) --brightness 0.1'
    const command={'linux':linux,'windows':windows}

    if(this.opsystem=='darwin'){
    	brightness.set(0.1).then(() => {
    		console.log('Changed brightness to 80%');
		  });
    } else {
      this.exec(command[this.opsystem],
        function (error) {
         if (error !== null) {
          console.log('exec error: ' + error);
         }
      });
    }
  }

  reverselowbrightness(){
    const brightness=require('brightness')
    const windows='Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1,100)';
    const linux='xrandr --output $(xrandr -q | grep "connected" | head -n 1 | cut -d " " -f1) --brightness 0.8'
    const command={'linux':linux,'windows':windows}

    if(this.opsystem=='darwin'){
      brightness.set(0.8).then(() => {
        console.log('Changed brightness to 80%');
      });
    } else {
      this.exec(command[this.opsystem],
        function (error) {
         if (error !== null) {
          console.log('exec error: ' + error);
         }
      });
    }
  }

  lockscreen(){
    const windows='rundll32.exe user32.dll,LockWorkStation';
    const linux='xdg-screensaver lock'
    const darwin='/System/Library/CoreServices/Menu\\ Extras/user.menu/Contents/Resources/CGSession -suspend'
    const command={'linux':linux,'darwin':darwin,'windows':windows}
    this.exec(command[this.opsystem],
        function (error) {
         if (error !== null) {
          console.log('exec error: ' + error);
         }
    });
  }

  notify(){
    let notification = new Notification('¡Alerta!', {
      body: 'Podrían estar observandote.'
    })
  }

  alarm(){

    var player = require('play-sound')

    // $ mplayer foo.mp3
    player.play('../../node_modules/ion-sound/sounds/bell_ring.mp3', function(err){
      if (err) throw err
    })

  }

}
