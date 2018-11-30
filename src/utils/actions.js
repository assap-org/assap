export class Action {

  constructor(actionName,opsystem) {
    this.actionName = actionName;
    this.opsystem = opsystem
    this.exec = require('child_process').exec;

  }



  executeAction(){
   switch (this.actionName) {
     case "lockscreen": this.lockscreen(); break;
     case "lowbrightness": this.brightness(); break;
    }
  }



  brightness(){
   	const windows='rundll32.exe user32.dll,LockWorkStation';
  	const linux='xdg-screensaver lock'
  	const mac='/System/Library/CoreServices/Menu\ Extras/user.menu/Contents/Resources/CGSession -suspend'
    const command={'linux':linux,'mac':mac,'windows':windows}
    console.log(command[this.opsystem])
    this.exec(command[this.opsystem],
        function (error, stdout, stderr) {
         if (error !== null) {
          console.log('exec error: ' + error);
         }
    });
  }
//xrandr -q | grep "connected" | head -n 1 | cut -d ' ' -f1
  lockscreen(){
  	const windows='rundll32.exe user32.dll,LockWorkStation';
  	const linux='xdg-screensaver lock'
  	const mac='/System/Library/CoreServices/Menu\ Extras/user.menu/Contents/Resources/CGSession -suspend'
    const command={'linux':linux,'mac':mac,'windows':windows}
    console.log(command[this.opsystem])
    this.exec(command[this.opsystem],
        function (error, stdout, stderr) {
         if (error !== null) {
          console.log('exec error: ' + error);
         }
    });
  }

  _exection(){
  	console.log("private")
  }

}

