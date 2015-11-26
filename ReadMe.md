# Redux React JSX JSPM SystemJs Babel Project Setup
### Simple Redux Single Immutable State Tree Demo
---

This is a working project setup configuration for the latest versions of jspm, systemjs, redux, react, jsx and babel-6.

For the specific project setup steps, see Section 'Setup/Install Procedures' below.

The setup includes a work-around for the jspm conflict related to the
babel-runtime (see Item 2-b). Essentially, the conflict means that babel cannot
be configured and executed locally. Therefore, this work-around requires babel
components to be installed globally, instead of locally.

Hopefully, this issue will be addressed in the next release of jspm or babel.
In the meantime, this workaround supports development with the latest version
of React.


**Feel free to make improvements...**

---


## Setup Package Versions

```
jspm version 0.16.15
redux version 3.0.4
react version 0.14.3
babel-cli version 6.2.0
babel-core version 6.2.1
babel-runtime 6.2.0
```

## Browsers
Works in all the following browsers. In IE, the 'bundled' versions seems to
work best.
* Chrome
* FireFox
* Edge
* IE

## Source Code for this Demo
The source code for this demo was taken from the free EggheadIO tutorial 
[Redux: The Single Immutable Tree](https://egghead.io/lessons/javascript-redux-the-single-immutable-state-tree?series=getting-started-with-redux) by Dan Abramov

## Why the complexity?
#### Due to a jspm version 0.16.15 conflict with babel-6, selected presets and plugins will need to be installed globally.

* This will allow for granular control and configuration of babel transpiler options.

* Word is that this conflict will be resolved with the release of jspm 0.17.0 due out in December, 2015.

#### Reference JSPM Warning
The following local installation attempt led to the conflict. jspm int with the
babel transpiler option loads a babel-5 version. Run the following install command and the warning is
generated. The only work around available so far involves installing the bable components
globally as shown in 2-b below.

```
jspm install npm:babel-runtime
```

__Result:
"warn babel-runtime@6.1.18 is unsupported for this version of jspm. Use jspm dl-loader --latest to update"__

[May be Related Issue](https://github.com/babel/babel-loader/issues/132)


## Setup/Install Procedures

### 1. Setup initial package.json
```
    npm init
```

### 2. Install Babel Globally
**[Babel Info](https://babeljs.io/)**

#### 2-a Install babel-cli

```
npm install --global babel-cli
```

---
##### 2-b Work-around for Babel 6 JSPM conflict - Run these npm global installations
* a. npm install -g babel-preset-react
* b. npm install -g babel-preset-es2015
* c. npm install -g babel-preset-stage-0
* d. npm install -g babel-plugin-transform-react-jsx
* e. npm install -g babel-plugin-transform-es2015-modules-commonjs
* f. npm install -g babel-plugin-transform-es2015-modules-amd
* g. npm install -g babel-plugin-transform-es2015-modules-systemjs

##### See the notes on .babelrc file setup (9-a below)
---


### 3. Install JSPM Globally

```
npm install -g jspm
```


### 4. Install JSPM Locally
```
npm install jspm --save-dev
```

### 5. Initialize JSPM
```
jspm init
```

* Take Transpiler Option 'Babel'
* Take alternate file storage location if desired (Example: lib instead of 'jspm_packages' directory)
* Take All Other Defaults


### 6. Install Babel Locally Using JSPM
**(If you run [CmdrX](./CmdrXReadMe.md) skip to step 9)**

   * a.  jspm config registries.npm.timeouts.lookup 120
   * b.  jspm install npm:babel-cli
   * c.  jspm install npm:babel-core
   * d.  jspm isntall npm:babel-runtime
   * e.  jspm install npm:babel-preset-react
   * f.  jspm install npm:babel-preset-es2015
   * g.  jspm install npm:babel-plugin-transform-es2015-modules-commonjs
   * h.  jspm install npm:babel-plugin-transform-es2015-modules-amd
   * i.  jspm install npm:babel-plugin-transform-es2015-modules-systemjs
   * j.  jspm install npm:babel-plugin-transform-react-jsx
   * k.  jspm install npm:babel-preset-stage-0
   * l.  jspm install css=github:systemjs/plugin-css


### 7. Install React and other components

  * a. jspm install npm:react
  * b. jspm install npm:react-dom
  * c. jspm install npm:redux

### 8. Install optional packages as necessary  
  * a. jspm install jquery
  * b. jspm install npm:lodash

### 9. Configurations

#### 9-a CREATE '.babelrc' file containing 'babel' transpiler options
'.babelrc' contents:

```
{
  "presets": [
      "es2015",
      "react",
      "stage-0"
  ]
}
```

#### 9-b Modify package.jason
Use Search and Replace to replace old babel-5 versions
with new babel-6 versions for 'babel-cli', 'babel-core'
and 'babel-runtime'.


#### 9-c Modify config.js

##### 9-c-1 Use Search and Replace to replace old babel-5 versions
with new babel-6 versions for 'babel-cli', 'babel-core'
and 'babel-runtime'.


##### 9-c-2 Delete duplicate entry

```
"npm:babel-runtime@6.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
```

#### 9-d Modify ./jspm_packages/.dependencies.json

#####9-d-1 Use Search and Replace to update babel-runtime, babel-core and babel-cli to the latest versions.

#####9-d-2 Replace
```
this:
  "npm:babel-runtime@6.2.0": {
    "process": "github:jspm/nodelibs-process@^0.1.0"
  },
```

```
with this:
    "npm:babel-runtime@6.2.0": {
      "core-js": "npm:core-js@1.2.6",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
```

#### 9-e Delete babel-5 package directories from /jspm_packages
    * 1. delete directory /jspm_packages/babel-core@5.8.34
    * 2. delete directory /jspm_packages/babel-runtime@5.8.34



### 10. Transpile JSX to Js Using Babel
**Note: 'babel' transpile options are controlled in the '.babelrc' file.

#### 10-a Manual Transpile to 'build' Directory

```
babel src --out-dir build --source-maps true
```
__babel will take options from '.babelrc' file__


#### 10-b OR!! Set Watch On JSX Directory
```
babel src --watch --out-dir build --source-maps true
```

### 11. Set Up A Server And Run The Application
Choose a server.

#### 11-a jspm-server
 * make sure jspm-server is installed globally.
__jspm install -g jspm-server__

 * To display index.html in the Browser->
Run: __jspm-server__<ENTER>

#### 11-b http-server
 * To display index.html in the Browser npm install -g http-server
 * (if port 8080 it taken, pick any port that is free)
 * Run: __http-server -p 8080__<ENTER>

#### 11-c OR - Any of a half-dozen other servers

### 12. Bundling
#### 12-a. Create the sfx bundle and output to 'prod' directory
* Create index2.html and link to app.js
* [Sfx](https://github.com/systemjs/systemjs/blob/master/docs/production-workflows.md)

```
jspm bundle-sfx build/main.js prod/app.js  --minify
```

#### 12-b Create a DepCache
* No change required for index.html
* [DepCache](https://github.com/systemjs/systemjs/blob/master/docs/production-workflows.md)
* __Note: This demo uses 'depcache'__

```
jspm  depcache build/main.js
```

---

# To Clone This Repo And Run The Demo App
  * a. Clone the repo to local directory
  * b. cd local Directory
  * c. Run the global npm and jspm installs (Items 1 through 3, above)
  * d. Run: npm install
  * e. Run: jspm install
  * f. See the Item 11 Above: **Set Up A Server And Run The Application**


---

# Resources

### npm
[npm-cli](https://github.com/npm/npm-cli)


### npm jsx loader
[npm jsx](https://www.npmjs.com/package/npm-loader-jsx)


### React Docs
[React Docs](https://facebook.github.io/react/docs/getting-started.html)

### JSPM Info
[jspm Info](http://jspm.io/)


### JSPM Docs
[jspm docs](https://github.com/jspm/jspm-cli)


### JSPM Bundling
[jspm bundles](https://github.com/jspm/jspm-cli/blob/master/docs/production-workflows.md)

### Systemjs
[Systemjs](https://github.com/systemjs/systemjs)

### Systemjs Config
[Systemjs Config](https://github.com/systemjs/systemjs/blob/master/docs/config-api.md)

### plugin-css Systemjs
[plugin-css](https://github.com/geelen/jspm-loader-css)
