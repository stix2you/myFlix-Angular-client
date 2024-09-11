import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'app-image-store',
   templateUrl: './image-store.component.html',
   styleUrls: ['./image-store.component.scss']
})
export class ImageStoreComponent {
   selectedFile: File | null = null;
   originalImageUrl: string | null = null;
   resizedImageUrl: string | null = null;

   constructor(private http: HttpClient) { }

   /**
    * @description Handles the file input change event and assigns the selected file.
    * @param event - The file input change event
    */
   onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      if (file) {
         this.selectedFile = file;
      }
   }

   /**
    * @description Uploads the selected image to the server and retrieves URLs for the original and resized images.
    */
   uploadImage(): void {
      if (!this.selectedFile) {
         alert('Please select an image file to upload.');
         return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post<any>('http://MyFlixLoadBalancer-308488375.us-east-2.elb.amazonaws.com/upload-image', formData)
         .subscribe(
            (response) => {
               // Assuming the response includes the location of the uploaded original image
               this.originalImageUrl = response.location;
               // Ensure originalImageUrl is not undefined before using replace
               this.resizedImageUrl = this.originalImageUrl ? this.originalImageUrl.replace('original-images', 'resized-images') : null;
               console.log('Original Image URL:', this.originalImageUrl);
               console.log('Resized Image URL:', this.resizedImageUrl);
            },
            (error) => {
               console.error('Error uploading the image:', error);
               alert('Error uploading the image. Please try again.');
            }
         );
   }
}
