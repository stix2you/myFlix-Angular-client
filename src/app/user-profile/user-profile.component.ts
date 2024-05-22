import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

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
      private fb: FormBuilder
   ) {
      this.profileForm = this.fb.group({
         username: [''],
         email: [''],
         birthday: [''],
         password: ['']
      });
   }

   ngOnInit(): void {
      console.log('ngOnInit called');
      this.getUserProfile();
   }

   getUserProfile(): void {
      const username = localStorage.getItem('username');
      console.log('Retrieved username from localStorage:', username); // Debug log

      if (username) {
         console.log('Username found, making API call to get user profile...');
         this.fetchApiData.getUserProfile(username).subscribe((response: any) => {
            console.log('API response:', response); // Debug log
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

   toggleEditMode(): void {
      this.editMode = !this.editMode;
   }

   onSubmit(): void {
      const username = localStorage.getItem('username');
      console.log('Retrieved username from localStorage for update:', username); // Debug log

      if (username) {
         this.fetchApiData.updateUserProfile(username, this.profileForm.value).subscribe(() => {
            console.log('User profile updated successfully'); // Debug log
            this.getUserProfile();
            this.toggleEditMode();
         }, error => {
            console.error('Error updating user profile:', error); // Debug log for update error
         });
      } else {
         console.error('Username not found for update'); // Debug log for missing username
      }
   }

   onDelete(): void {
      const username = localStorage.getItem('username');
      if (username) {
         if (confirm('Are you sure you want to delete your account?')) {
            this.fetchApiData.deleteUserAccount(username).subscribe(() => {
               // Handle account deletion (e.g., redirect to welcome page)
            });
         }
      } else {
         console.error('Username not found');
      }
   }
}
