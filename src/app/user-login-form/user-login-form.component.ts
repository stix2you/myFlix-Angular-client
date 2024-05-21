// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 

@Component({
   selector: 'app-user-login-form',
   templateUrl: './user-login-form.component.html',
   styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

   @Input() userData = { username: '', password: '' };  

   constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router
   ) { }

   ngOnInit(): void {
   }

   // This is the function responsible for sending the form inputs to the backend
   loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
         // Logic for a successful user login goes here! (To be implemented)
         console.log('UserInfo:', this.userData);
         console.log('Verify fetch after successful fetch', result);

         localStorage.setItem('user', JSON.stringify(result.user));
         localStorage.setItem('token', result.token);

         // Console log to verify stored data
         console.log('Local Storage: User data:', JSON.parse(localStorage.getItem('user') || '{}'));
         console.log('Local Storage: Token:', localStorage.getItem('token'));

         this.dialogRef.close(); // This will close the modal on success!

         this.router.navigate(['movies']);

         this.snackBar.open(result, 'OK', {
            duration: 2000
         });
      }, (result) => {  // Error handling ??
         console.log('UserInfo:', this.userData);
         console.log('Verify value of result in error branch:', result);
         this.snackBar.open(result, 'Failed', {
            duration: 2000
         });
      });
   }

}