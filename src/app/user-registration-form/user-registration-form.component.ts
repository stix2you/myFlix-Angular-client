// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

//  I'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// The @Component decorator is a class decorator that allows you to mark a class 
// as an Angular component and provide additional metadata that determines how the 
// component should be processed, instantiated, and used at runtime.
@Component({
   selector: 'app-user-registration-form',  // a selector that identifies this component and allows it to be 
   // used as an element elsewhere in the app, such as parent components
   // as such: <app-user-registration-form></app-user-registration-form>
   templateUrl: './user-registration-form.component.html',
   styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

   @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

   constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

   ngOnInit(): void {    // ngOnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   }

   // This is the function responsible for sending the form inputs to the backend
   // userData is an object representing the values of the registration form
   // and is then passed to the API call within this function
   registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
         // Logic for a successful user registration goes here! (To be implemented)
         this.dialogRef.close(); // This will close the modal on success!
         console.log(result);
         this.snackBar.open(result, 'OK', {
            duration: 2000
         });
      }, (result) => {
         console.log(result);
         this.snackBar.open(result, 'OK', {
            duration: 2000
         });
      });
   }

}