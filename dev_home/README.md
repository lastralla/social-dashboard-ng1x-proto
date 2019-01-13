# Frontend Dev Home

This is a place for coding guidelines.


---------------


## Frontend Development Machine Setup

1. Install [Node.js](http://nodejs.org) version 4.x (npm that comes with v5.x does not work)

	- on OSX use [homebrew](http://brew.sh)

	```bash
	brew update
	brew install homebrew/versions/node4-lts
	```

	- or on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

	```bash
	choco install nodejs
	```


2. Install required npm packages

	```bash
	npm install -g nodemon
  npm install -g webpack
	```

	> The commands above require using sudo. Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md).

  > nodemon is used for running stub server (that simulates a backend), Webpack is used to bundle frontend assets.


3. Configure frontend environment for machine

  - Create `environment.js` file at frontend root and add your Facebook key to it.

  ```bash
  cp environment.example.js environment.js
  ```

  > environment.js is in .gitignore since it is different for every development or production environment.


4. Configure Facebook app

  - Create an app in Facebook

  - Configure Facebook app to use same settings as in environement.js


5. Install backend tools using Homebrew

	```bash
	brew update
	brew install caskroom/cask/brew-cask
	brew cask install java
	brew install scala
	brew install typesafe-activator
	brew install sbt
	```


---------------


## Frontend Project Setup

Run at command line from frontend project root:

1. Install npm packages

  - First time running npm for the project (and from time to time) clear npm's local cache to avoid problems

	```bash
	npm cache clear
	```

	- Install project dependencies


  ```bash
  npm install
  ```

2. Start development environment

	```bash
	npm run start
	```

	This starts a dev server (stubs the backend) and sets up watchers that run during development.


  > **To test production build on the dev server run `npm run start-prod`.**


---------------


## Project Folder Structure

See `folder-structure.md` for detailed explanation of folder structure.


---------------


## Metrics Data Format

See `metrics-generator/` for node scripts.

  - `xxxxDump.json` is a backend dump containing latest data format for a category
  - `testData.js` is a node script to explore the data
  - `metricsLookupTableGenerator.js`, node script to run to generate lookup table
  - `metricsLookup.js` is the generated file to be copied into Angular app (must replace double quotes)


---------------
