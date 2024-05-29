import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../authorization/authorization.component';

@Component({
   selector: 'app-user-profile',
   templateUrl: './user-profile.component.html',
   styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
   userProfile: any = {};
   editMode: boolean = false;
   profileForm: FormGroup;

   constructor(
      private fetchApiData: FetchApiDataService,
      private fb: FormBuilder,
      private router: Router,
      public snackBar: MatSnackBar,
      private authService: AuthService
   ) {
      this.profileForm = this.fb.group({
         username: [''],
         email: [''],
         birthday: [''],
         password: ['']
      });
   }

   ngOnInit(): void {
      this.getUserProfile();
   }

   getUserProfile(): void {
      const username = localStorage.getItem('username');
      if (username) {
         this.fetchApiData.getUserProfile(username).subscribe(
            (response: any) => {
               this.userProfile = response;
               this.profileForm.patchValue({
                  username: this.userProfile.username,
                  email: this.userProfile.email,
                  birthday: this.userProfile.birthday
               });
            },
            error => {
               console.error('API call error:', error);
               this.snackBar.open('Error Fetching Profile! Please Login Again!', 'OK', {
                  duration: 2000
               });
            }
         );
      } else {
         console.error('Username not found');
         this.snackBar.open('User Not Found! Please Login Again!', 'OK', {
            duration: 2000
         });
      }
   }

   toggleEditMode(): void {
      this.editMode = !this.editMode;
   }

   onSubmit(): void {
      const username = localStorage.getItem('username');
      if (username) {
         this.fetchApiData.updateUserProfile(username, this.profileForm.value).subscribe(
            () => {
               this.authService.login({
                  username: this.profileForm.value.username,
                  password: this.profileForm.value.password
               }).subscribe(
                  (result) => {
                     localStorage.setItem('user', JSON.stringify(result.user));
                     localStorage.setItem('username', result.user.username);
                     localStorage.setItem('token', result.token);

                     this.snackBar.open('Profile updated and re-login successful!', 'OK', {
                        duration: 2000
                     });
                     this.getUserProfile();
                     this.toggleEditMode();
                  },
                  (error) => {
                     console.error('Error logging in with updated information:', error);
                     this.snackBar.open('Error Logging In With Updated Information! Please Try Again!', 'OK', {
                        duration: 2000
                     });
                  }
               );
            },
            error => {
               console.error('Error updating user profile:', error);
               this.snackBar.open('Error Updating Profile! Contact Admin!', 'OK', {
                  duration: 2000
               });
            }
         );
      } else {
         console.error('Username not found for update');
         this.snackBar.open('Error Updating Profile! Contact Admin!', 'OK', {
            duration: 2000
         });
      }
   }

   onDelete(): void {
      const username = localStorage.getItem('username');
      if (username) {
         if (confirm('Are you sure you want to delete your account?')) {
            this.fetchApiData.deleteUserAccount(username).subscribe(() => {
               localStorage.removeItem('username');
               this.router.navigate(['/welcome']);
            });
         }
      } else {
         console.error('Error deleting account');
         this.snackBar.open('Error Deleting User Account! Contact Admin!', 'OK', {
            duration: 2000
         });
      }
   }
}
