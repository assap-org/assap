export class Action {

  constructor(actionName,opsystem) {
    this.actionName = actionName;
    this.opsystem = opsystem
    this.exec = require('child_process').exec;

  }



  executeAction(){
   switch (this.actionName) {
     case "lockscreen": this.lockscreen(); break;
     case "lowbrightness": this.lowbrightness(); break;
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



}
