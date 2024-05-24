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

   // This will hold the input values from the form
   @Input() userData = { username: '', password: '', email: '', birthday: '' };

   // Inject the necessary services for the component
   constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

   ngOnInit(): void { }

   // This method will send the form inputs to the backend
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

   // This method will check if the form is valid before sending the form
   isValidForm(): boolean {
      return this.userData.username.length >= 8 &&
         this.userData.password.length >= 8 &&
         this.isValidEmail(this.userData.email) &&
         this.isValidDate(this.userData.birthday);
   }

   // This method will check if the email is valid
   isValidEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // regex for email validation
      return re.test(String(email).toLowerCase());
   }

   // This method will check if the date is valid
   isValidDate(date: string): boolean {
      const parsedDate = Date.parse(date);
      return !isNaN(parsedDate);   // returns false if the date is invalid
   }
}
