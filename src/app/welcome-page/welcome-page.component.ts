/**
 * @component WelcomePageComponent
 * @description Component for the welcome page of the application.
 */
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';

/**
   * @description Constructor for WelcomePageComponent.
   * @param {MatDialog} dialog - The dialog service to open dialogs.
   */
@Component({
   selector: 'app-welcome-page',
   templateUrl: './welcome-page.component.html',
   styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
   
   /**
   * @description Constructor for WelcomePageComponent.
   * @param {MatDialog} dialog - The dialog service to open dialogs.
   */
   constructor(public dialog: MatDialog) { }

   /**
   * @description Angular lifecycle hook that gets called after the component's view has been fully initialized.
   */
   ngOnInit(): void {
   }
   
   /**
   * @description Opens the user registration dialog when the signup button is clicked.
   */
   openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
         width: '280px'
      });
   }

   /**
   * @description Opens the user login dialog when the login button is clicked.
   */
   openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
         width: '280px'
      });
   }

   /**
   * @description Opens the user profile dialog when the profile button is clicked.
   */
   openUserProfileDialog(): void {
      this.dialog.open(UserProfileComponent, {
         width: '280px'
      });
   }
}