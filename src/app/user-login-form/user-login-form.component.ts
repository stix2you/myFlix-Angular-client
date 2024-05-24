import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
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

   // This is the function responsible for saving info to local storage and navigating to the movies view
   loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe(
         (result) => {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('username', result.user.username); // Store username separately
            localStorage.setItem('token', result.token);

            this.dialogRef.close(); // This will close the modal on success!

            this.router.navigate(['movies']);
            this.snackBar.open('Login successful!', 'OK', {
               duration: 2000
            });
         },
         (error) => {  // Error handling
            this.snackBar.open('Login Failed!', 'OK', {
               duration: 2000
            });
         }
      );
   }

}