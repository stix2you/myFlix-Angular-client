import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';

// This component provides the welcome page for the app
@Component({
   selector: 'app-welcome-page',
   templateUrl: './welcome-page.component.html',
   styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
   constructor(public dialog: MatDialog) { }
   ngOnInit(): void {
   }
   // This method will open the dialog when the signup button is clicked
   openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
         width: '280px'
      });
   }
   // This method will open the dialog when the login button is clicked
   openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
         width: '280px'
      });
   }
   // This method will open the dialog when the profile button is clicked
   openUserProfileDialog(): void {
      this.dialog.open(UserProfileComponent, {
         width: '280px'
      });
   }
}