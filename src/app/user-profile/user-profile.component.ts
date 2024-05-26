/**
 * @component UserProfileComponent
 * @description Component to display and edit user profile information.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// This component provides the user profile view
// It allows users to view and edit their profile information
@Component({
   selector: 'app-user-profile',
   templateUrl: './user-profile.component.html',
   styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
   userProfile: any = {};
   editMode: boolean = false;
   profileForm: FormGroup;

   /**
   * @description Constructor for UserProfileComponent.
   * @param {FetchApiDataService} fetchApiData - The service to fetch API data.
   * @param {FormBuilder} fb - The form builder service.
   * @param {Router} router - The router service to navigate between views.
   * @param {MatSnackBar} snackBar - The service to display snack bar messages.
   */
   constructor(
      private fetchApiData: FetchApiDataService,
      private fb: FormBuilder,
      private router: Router,
      public snackBar: MatSnackBar,
   ) {
      this.profileForm = this.fb.group({   // Define the form group
         username: [''],
         email: [''],
         birthday: [''],
         password: ['']
      });
   }

   /**
   * @description Angular lifecycle hook that gets called after the component's view has been fully initialized.
   */
   ngOnInit(): void {
      this.getUserProfile();
   }

   /**
   * @description Fetches the user profile from the backend.
   */
   getUserProfile(): void {
      const username = localStorage.getItem('username');  // Get username from localStorage

      if (username) {
         this.fetchApiData.getUserProfile(username).subscribe((response: any) => {
            this.userProfile = response;
            this.profileForm.patchValue({
               username: this.userProfile.username,
               email: this.userProfile.email,
               birthday: this.userProfile.birthday
            });
         }, error => {
            console.error('API call error:', error); // Debug log for API error
            this.snackBar.open('Error Fetching Profile! Please Login Again!', 'OK', {
               duration: 2000
            });
         });
      } else {
         console.error('Username not found'); // Debug log for missing username
         this.snackBar.open('User Not Found! Please Login Again!', 'OK', {
            duration: 2000
         });
      }
   }

   /**
   * @description Toggles the edit mode for the profile form.
   */
   toggleEditMode(): void {
      this.editMode = !this.editMode;
   }

   /**
   * @description Submits the updated profile form.
   */
   onSubmit(): void {
      const username = localStorage.getItem('username');

      if (username) {
         this.fetchApiData.updateUserProfile(username, this.profileForm.value).subscribe(() => {
            this.getUserProfile();
            this.toggleEditMode();
         }, error => {
            console.error('Error updating user profile:', error); // Debug log for update error
            this.snackBar.open('Error Updating Profile! Contact Admin!', 'OK', {
               duration: 2000
            });
         });
      } else {
         console.error('Username not found for update'); // Debug log for missing username
         this.snackBar.open('Error Updating Profile! Contact Admin!', 'OK', {
            duration: 2000
         });
      }
   }

   /**
   * @description Deletes the user account.
   */
   onDelete(): void {
      const username = localStorage.getItem('username');
      if (username) {
         if (confirm('Are you sure you want to delete your account?')) {
            this.fetchApiData.deleteUserAccount(username).subscribe(() => {
               localStorage.removeItem('username'); // Remove username from localStorage
               this.router.navigate(['/welcome']); // Redirect to welcome page
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
