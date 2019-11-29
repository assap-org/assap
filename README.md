# Anti Shoulder Surfing Attack Platform (ASSAP)

[![Build Status](https://travis-ci.org/assap-org/assap.svg?branch=master)](https://travis-ci.org/assap-org/assap)
[![Build status](https://ci.appveyor.com/api/projects/status/ui4m9yhav33qrvgs?svg=true)](https://ci.appveyor.com/project/jiep/assap)


> ASSAP is a multiplatform tool whose aim is to stablish deffensive measures against shoulder surfing attack, technique used for getting confidential information.

> The application has different security measures that can be configured by the users depending on the moment of use. ASSAP is designed to be simple to use so that anyone without knowledge can activate and use it, preventing other people from obtaining their confidential data such as passwords, bank accounts, private data, etc.

<p align="center">
 <img width="80%" src="./img/use.png">
</p>

> **For more detailed info, visit our [wiki](https://github.com/assap-org/assap/wiki).**


## Getting Started

These instructions will get you a copy of the project up and running on your local machine.
You can directly download the [binaries](https://github.com/assap-org/assap/releases) for you OS or follow the next steps.

### Prerequisites

It's necessary to have `node` (>9) and `npm`(>5) installed.
(It has been tested with `node 9.11.2` and `npm 5.6.0`)

* [Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Node v9.11.2 and npm v5.6.0 for Windows](https://nodejs.org/dist/v9.11.2/node-v9.11.2-x64.msi)


**Check installed Versions**

```
npm -v
node -v
```

### Installing

#### Dependencies installation

##### Linux & Mac 

```
npm install
```

##### Windows
> Administration privileges may be required.

1. Install [Python 3.7](https://www.python.org/downloads/release/python-375/) (Versions above this are not supported).
It is necessary to configure the Enviroment variables. If you check "Add Python 3.7 to PATH", go to Step 2.
    1. Open the Control Panel (easy way: click in the `Windows` search on your task bar, type `Control Panel`, then click the icon).
    2. In the `Control Panel`, search for `Environment`; click `Edit the System Environment Variables`. Then click the `Environment Variables` button.
    3. In the `System Variables` section, you will need to either edit an existing `PATH` variable. If you’re editing an existing `PATH`, the values are presented on separate lines in the edit dialog. Add your Python 3.7 path Example: `C:\Python37`. 
    4. Open `CMD` and check `python` is installed with the command `python --version`.

2. Install `node-gyp`. 
```
npm install -g node-gyp
```

3. Install node package only for Windows (It takes a while, be patient).
```
npm install --global --production windows-build-tools 
```

4. Install project dependencies.
```
npm install 
```


#### How to run

```
npm run electron:serve
```

#### How to build
```
npm run electron:build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Authors

<p align="center">
 <img src="./img/team.png">
</p>

* **Nerea Sainz De La Maza** ([@nereasainzdelamaza](https://github.com/nereasainzdelamaza))
* **José Ignacio Escribano** ([@jiep](https://github.com/jiep))
* **Jorge Cuadrado Sáez** ([@jorcuad](https://github.com/jorcuad))
* **Ruth González Novillo** ([@RuthGnz](https://github.com/RuthGnz))




<!-- Banner -->
<p align="center">
  <img src="./img/banner.png"/>
</p>
<h4 align="center" style="margin: -20px">Made with <span style="color:#e25555;">❤️</span> by <a Cybersecurity Lab @ <a href="https://www.bbvanexttechnologies.com">BBVA Next Technologies</a> </h4>
