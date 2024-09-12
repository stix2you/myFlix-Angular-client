import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'app-image-store',
   templateUrl: './image-store.component.html',
   styleUrls: ['./image-store.component.scss'],
})
export class ImageStoreComponent {
   selectedFile: File | null = null;
   originalImageUrl: string | null = null;
   resizedImageUrl: string | null = null;
   originalImageSize: string | null = null;
   resizedImageSize: string | null = null;
   showResizedImage: boolean = false;
   retryCount: number = 0;
   maxRetries: number = 7;
   retryDelay: number = 2000; // 2 seconds

   // Arrays to store all the images in the S3 bucket
   allOriginalImages: string[] = [];
   allResizedImages: string[] = [];

   // Arrays to store the filenames of the images
   allOriginalFilenames: string[] = [];
   allResizedFilenames: string[] = [];

   constructor(private http: HttpClient) {
      this.fetchAllImages(); // Fetch all images on component initialization
   }

   /**
    * Handles file selection event.
    * @param event File selection event
    */
   onFileSelected(event: any): void {
      if (event.target.files && event.target.files.length > 0) {
         this.selectedFile = event.target.files[0];
      }
   }

   /**
    * Uploads the selected image to the server and retrieves URLs for the original and resized images.
    */
   uploadImage(): void {
      if (!this.selectedFile) {
         alert('Please select an image file to upload.');
         return;
      }
      // Reset variables at the beginning of a new upload
      this.originalImageUrl = null;
      this.resizedImageUrl = null;
      this.originalImageSize = null;
      this.resizedImageSize = null;
      this.showResizedImage = false;
      this.retryCount = 0;

      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http
         .post<any>('http://MyFlixLoadBalancer-308488375.us-east-2.elb.amazonaws.com/upload-image', formData)
         .subscribe(
            (response) => {
               // Assuming the response includes the location of the uploaded original image
               this.originalImageUrl = response.location;
               // Ensure originalImageUrl is not undefined before using replace
               this.resizedImageUrl = this.originalImageUrl
                  ? this.originalImageUrl.replace('original-images', 'resized-images')
                  : null;
               console.log('Original Image URL:', this.originalImageUrl);
               console.log('Resized Image URL:', this.resizedImageUrl);

               // Set a timeout to check if resized image is ready
               this.retryCount = 0;
               this.checkResizedImage();

               // Fetch all images after uploading a new one
               this.fetchAllImages();
            },
            (error) => {
               console.error('Error uploading the image:', error);
               alert('Error uploading the image. Please try again.');
            }
         );
   }

   /**
    * Checks if the resized image is available.
    */
   checkResizedImage(): void {
      if (!this.resizedImageUrl) return;

      const img = new Image();
      img.onload = () => {
         this.showResizedImage = true;
         this.fetchAllImages(); // Fetch all images after the resized image is ready
      };
      img.onerror = () => {
         if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            setTimeout(() => this.checkResizedImage(), this.retryDelay);
         } else {
            console.error('Failed to load the resized image after several attempts.');
         }
      };
      img.src = this.resizedImageUrl;
   }

   /**
   * Fetches all images from the S3 bucket.
   */
   fetchAllImages(): void {
      this.http
         .get<any>('http://MyFlixLoadBalancer-308488375.us-east-2.elb.amazonaws.com/list-images')
         .subscribe(
            (response) => {
               // Exclude the first entry from each array
               this.allOriginalImages = response.originalImages.slice(1);
               this.allResizedImages = response.resizedImages.slice(1);

               // Extract filenames from URLs
               // Extract filenames from URLs with fallback for undefined values
               this.allOriginalFilenames = this.allOriginalImages.map((url) => url.split('/').pop() || '');
               this.allResizedFilenames = this.allResizedImages.map((url) => url.split('/').pop() || '');

               console.log('Fetched Original Images:', this.allOriginalImages);
               console.log('Fetched Resized Images:', this.allResizedImages);
            },
            (error) => {
               console.error('Error fetching images from S3:', error);
            }
         );
   }

   /**
    * Gets the dimensions of the image once it is loaded.
    * @param event The event emitted when the image is loaded.
    * @param type The type of image ('original' or 'resized').
    */
   getImageSize(event: any, type: string): void {
      const imgElement = event.target as HTMLImageElement;
      const size = `${imgElement.naturalWidth} x ${imgElement.naturalHeight}`;

      if (type === 'original') {
         this.originalImageSize = size;
      } else if (type === 'resized') {
         this.resizedImageSize = size;
      }
   }
}
