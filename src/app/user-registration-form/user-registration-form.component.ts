import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-user-registration-form',
   templateUrl: './user-registration-form.component.html',
   styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

   @Input() userData = { username: '', password: '', email: '', birthday: '' };

   constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

   ngOnInit(): void { }

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

   isValidForm(): boolean {
      return this.userData.username.length >= 8 &&
         this.userData.password.length >= 8 &&
         this.isValidEmail(this.userData.email) &&
         this.isValidDate(this.userData.birthday);
   }

   isValidEmail(email: string): boolean {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
   }

   isValidDate(date: string): boolean {
      const parsedDate = Date.parse(date);
      return !isNaN(parsedDate);
   }
}
