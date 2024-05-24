import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

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

   constructor(
      private fetchApiData: FetchApiDataService,
      private fb: FormBuilder,
      private router: Router
   ) {
      this.profileForm = this.fb.group({   // Define the form group
         username: [''],
         email: [''],
         birthday: [''],
         password: ['']
      });
   }

   // This method will run when the component is initialized, fetching the user profile from the backend 
   ngOnInit(): void {
      this.getUserProfile();
   }

   // This method will fetch the user profile from the backend
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
         });
      } else {
         console.error('Username not found'); // Debug log for missing username
      }
   }

   // This method will toggle the edit mode for the profile form
   toggleEditMode(): void {
      this.editMode = !this.editMode;
   }

   // This method will submit the updated profile form
   onSubmit(): void {
      const username = localStorage.getItem('username');

      if (username) {
         this.fetchApiData.updateUserProfile(username, this.profileForm.value).subscribe(() => {
            this.getUserProfile();
            this.toggleEditMode();
         }, error => {
            console.error('Error updating user profile:', error); // Debug log for update error
         });
      } else {
         console.error('Username not found for update'); // Debug log for missing username
      }
   }

   // This method will delete the user account
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
      }
   }
}
