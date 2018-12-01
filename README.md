# Anti Shoulder Surfing Attack Platform (ASSAP)

[![Build Status](https://travis-ci.org/assap-org/assap.svg?branch=master)](https://travis-ci.org/assap-org/assap)
[![Build status](https://ci.appveyor.com/api/projects/status/ui4m9yhav33qrvgs?svg=true)](https://ci.appveyor.com/project/jiep/assap)


ASSAP is a multiplatform tool whose aim is to stablish deffensive measures against shoulder surfing attack, technique used for getting confidential information.

The application has different security measures that can be configured by the users depending on the moment of use. ASSAP is designed to be simple to use so that anyone without knowledge can activate and use it, preventing other people from obtaining their confidential data such as passwords, bank accounts, private data, etc.

## Actions
When the Shoulder Sourfing Attack is detected, the tool execs an action. There are several actions:
1. Reduce Brightness
2. Lock Screen
3. Alerts
4. Sound

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

It's necessary to have node (v9) and npm(v5) installed.

```

* [Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```

### Installing



Dependencies installation
```
npm install
```

How to run
```
npm run electron:serve
```


## Extending Actions
For implementing new actions it is necessary to modify the file "/utils/actions.js"

1. Add the action name to the list this.availableActions.
2. Create one the function with the funcionallity to launch the action.
3. Add the function to the executeAction() function.
4. If it's necessary, create a function to reverse the action and add it to the reverseAction() function.

## Built With

* [Electron](https://electronjs.org/) - The Framework used for creating the multiplatform app
* [VueJS](https://vuejs.org/) - Progressive JavaScript Framework
* [PugJS](https://pugjs.org/) - Template Engine
* [SASS](https://sass-lang.com/) - CSS extension language
* [Face-api](https://github.com/justadudewhohacks/face-api.js?files=1) - Used for face detenction




## Authors

* **Nerea Sainz De La Maza** 
* **Jose Ignacio Escribano** 
* **Jorge Cuadrado Sáez** 
* **Ruth González Novillo** 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
