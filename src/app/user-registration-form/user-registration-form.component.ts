/**
 * @component UserRegistrationFormComponent
 * @description Component for the user registration form.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// This component provides the user registration form
@Component({
   selector: 'app-user-registration-form',
   templateUrl: './user-registration-form.component.html',
   styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

   /**
   * @description The user data entered in the registration form.
   */
   @Input() userData = { username: '', password: '', email: '', birthday: '' };

   /**
   * @description Constructor for UserRegistrationFormComponent.
   * @param {FetchApiDataService} fetchApiData - The service to fetch API data.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog opened for registration.
   * @param {MatSnackBar} snackBar - The service to display snack bar messages.
   */
   constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

   /**
   * @description Angular lifecycle hook that gets called after the component's view has been fully initialized.
   */
   ngOnInit(): void { }

   /**
   * @description Registers the user by calling the API and handles the response.
   */
   registerUser(): void {
      if (this.isValidForm()) {
         this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
            this.dialogRef.close();
            this.snackBar.open('Registration successful', 'OK', {
               duration: 2000
            });
         }, (error) => {
            if (error.status === 400 && error.error.includes('already exists')) {
               this.snackBar.open('Username already exists', 'OK', {
                  duration: 2000
               });
            } else {
               this.snackBar.open('Error registering user! Please try again later!', 'OK', {
                  duration: 2000
               });
            }
         });
      } else {
         this.snackBar.open('Please fill out the form correctly!', 'OK', {
            duration: 2000
         });
      }
   }

   /**
   * @description Checks if the form is valid before submitting.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
   isValidForm(): boolean {
      return this.userData.username.length >= 8 &&
         this.userData.password.length >= 8 &&
         this.isValidEmail(this.userData.email) &&
         this.isValidDate(this.userData.birthday);
   }

   /**
   * @description Validates the email format.
   * @param {string} email - The email to validate.
   * @returns {boolean} True if the email is valid, false otherwise.
   */
   isValidEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // regex for email validation
      return re.test(String(email).toLowerCase());
   }

   /**
   * @description Validates the date format.
   * @param {string} date - The date to validate.
   * @returns {boolean} True if the date is valid, false otherwise.
   */
   isValidDate(date: string): boolean {
      const parsedDate = Date.parse(date);
      return !isNaN(parsedDate);   // returns false if the date is invalid
   }
}
