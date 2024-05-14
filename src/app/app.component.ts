// Code: This file defines the root component of the application. 
// It contains the title of the application and a selector that defines 
// the HTML element in which the component will be rendered.

// The root component is the default entry point to your Angular application. 
// When a user launches your application, the root component is displayed as 
// the home page. Think of it like the MainViewin your myFlix React project—loading 
// data and displaying one View or another depending on its state

// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
   selector: 'app-root', // the selector 
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'myFlix-Angular-client';

   // Anguar Material Dialog is passed to the constructor so it is available to the component:
   constructor(public dialog: MatDialog) { }

   // This is the function that will open the dialog when the signup button is clicked  
   openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
         // Assigning the dialog a width
         width: '280px'
      });
   }

   // This is the function that will open the dialog when the login button is clicked
   openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
         width: '280px'
      });
   }
}