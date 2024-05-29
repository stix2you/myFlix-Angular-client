import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/authorization.component';

@Component({
   selector: 'app-user-registration-form',
   templateUrl: './user-registration-form.component.html',
   styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
   @Input() userData = { username: '', password: '', email: '', birthday: '' };

   /**
    * @description Constructor for UserRegistrationFormComponent.
    * @param {FetchApiDataService} fetchApiData - The service to fetch API data.
    * @param {MatDialogRef} dialogRef - The reference to the dialog.
    * @param {MatSnackBar} snackBar - The service to display snack bar messages.
    * @param {Router} router - The router service to navigate between views.
    * @param {AuthService} authService - The service to handle user authorization.
    */
   constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router,
      private authService: AuthService 
   ) { }

   ngOnInit(): void { }

   /**
    * @description Registers a new user by calling the userRegistration method from the FetchApiDataService.
    */
   registerUser(): void {
      if (this.isValidForm()) {
         this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
            this.snackBar.open('Registration successful', 'OK', {
               duration: 2000
            });
            this.loginUser(); 
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
    * @description Logs in a user by calling the login method from the AuthService.
    */
   loginUser(): void {
      this.authService.login(this.userData).subscribe((response) => {
         this.snackBar.open('Login successful', 'OK', {
            duration: 2000
         });
         this.dialogRef.close();
         this.router.navigate(['movies']); 
      }, (error) => {
         this.snackBar.open('Login failed! Please try again.', 'OK', {
            duration: 2000
         });
      });
   }

   /**
    * @description Checks if the form is valid.
    * @returns {boolean} - True if the form is valid, false otherwise.
    */
   isValidForm(): boolean {
      return this.userData.username.length >= 8 &&
         this.userData.password.length >= 8 &&
         this.isValidEmail(this.userData.email) &&
         this.isValidDate(this.userData.birthday);
   }

   /**
    * @description Checks if an email is valid.
    * @param {string} email - The email to check.
    * @returns {boolean} - True if the email is valid, false otherwise.
    */
   isValidEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // regex for email validation
      return re.test(String(email).toLowerCase());
   }

   /**
    * @description Checks if a date is valid.
    * @param {string} date - The date to check. 
    * @returns {boolean} - True if the date is valid, false otherwise.
    */
   isValidDate(date: string): boolean {
      const parsedDate = Date.parse(date);
      return !isNaN(parsedDate);   // returns false if the date is invalid
   }
}
