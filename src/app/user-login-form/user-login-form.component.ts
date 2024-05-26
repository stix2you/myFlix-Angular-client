/**
 * @component UserLoginFormComponent
 * @description Component for the user login form.
 */
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

   /**
   * @description Constructor for UserLoginFormComponent.
   * @param {FetchApiDataService} fetchApiData - The service to fetch API data.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog opened for login.
   * @param {MatSnackBar} snackBar - The service to display snack bar messages.
   * @param {Router} router - The router service to navigate between views.
   */
   constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router
   ) { }

   /**
   * @description Angular lifecycle hook that gets called after the component's view has been fully initialized.
   */
   ngOnInit(): void {
   }

   /**
   * @description Logs in the user by calling the API and saves the user info to local storage.
   */
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