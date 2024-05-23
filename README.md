*************************
WELCOME TO MYFLIX ANGULAR
*************************


--------------------
Project Description:
--------------------

MyFlix Angular is a Movie Catalog App to catalog Movies and store data on the Movies, Directors, Actors, Genres, and the Users who wish to view the data.  It was built using Angular and is connected to a backend database.  It also uses Angular Material for styling. 


Project Dependencies: 
This project uses an API built by myself, hosted here:
https://stix2you-myflix-5cbcd3c20372.herokuapp.com/

Further information and documentation related to this API can be found here:
https://github.com/stix2you/myFlix_api

Git Repo for this client-side Angular project here:
https://github.com/stix2you/myFlix-Angular-client



----------------------------------
PROJECT SETUP FOR DEV ENVIRONMENT:
----------------------------------

- Download repo from above URL and install in a directory.

- In terminal windown within that directory:

- Set up Node to lateset stable version

   nvm install 16.19.0 (or whatever is latest stable version)
   nvm use 16.19.0

- Install Angular [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6

   npm install -g @angular/cli

- Install Angular Material [documentation here: https://material.angular.io/]

   ng add @angular/material

- Navigate to directory you want to place the project in

- Clone this repository https://github.com/stix2you/myFlix-Angular-client

   git clone https://github.com/stix2you/myFlix-Angular-client

- Install project dependencies (see full list below):

   npm install 

- To start Dev server for mobile devices, enter:

   npm start   (this runs a script to launch a dev server on port 8080, which is accepted by the CORS of the database)


-------------
DEPENDENCIES:
-------------

Dependencies can be viewed in the package.json file, this is a copy of that file as of the writing of this document:

{
  "name": "my-flix-angular-client",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --port 8080",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^17.3.0",
    "@angular/cdk": "^17.3.8",
    "@angular/common": "^17.3.0",
    "@angular/compiler": "^17.3.0",
    "@angular/core": "^17.3.0",
    "@angular/forms": "^17.3.0",
    "@angular/material": "^17.3.8",
    "@angular/platform-browser": "^17.3.0",
    "@angular/platform-browser-dynamic": "^17.3.0",
    "@angular/router": "^17.3.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.3"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.3.6",
    "@angular/cli": "^17.3.6",
    "@angular/compiler-cli": "^17.3.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.4.2"
  }
}


********************
ANGULAR INFORMATION:
********************

# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

To set up this project, install Angular globally on your machine:
$ npm install -g @angular/cli

Then clone this repository into a project directory, go to that directory, and install dependencies:
$ npm install

## Development server

Run `npm start` which will run a script:  `ng serve --port 8080` for a dev server. Navigate to `http://localhost:8080/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
