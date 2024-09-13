import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

   // New Arrays to store the sizes of the images
   allOriginalSizes: string[] = [];
   allResizedSizes: string[] = [];

   constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
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
               // Updated to handle both original and resized locations
               this.originalImageUrl = response.originalLocation;
               this.resizedImageUrl = response.resizedLocation;

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
      // Add a delay before checking if the resized image is ready
      setTimeout(() => {
         img.src = this.resizedImageUrl + '?cacheBust=' + new Date().getTime(); // Prevent caching issues
      }, 3000); // 3 seconds delay before starting the check
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

               // Initialize sizes only if they are undefined or not already set
               if (!this.allOriginalSizes.length) {
                  this.allOriginalSizes = this.allOriginalImages.map(() => '');
               }
               if (!this.allResizedSizes.length) {
                  this.allResizedSizes = this.allResizedImages.map(() => '');
               }

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

   /**
 * Gets the dimensions of the image in the list once it is loaded.
 * @param event The event emitted when the image is loaded.
 * @param type The type of image ('original' or 'resized').
 * @param index The index of the image pair in the list.
 */
   getListImageSize(event: any, type: string, index: number): void {
      const imgElement = event.target as HTMLImageElement;
      const size = `${imgElement.naturalWidth} x ${imgElement.naturalHeight}`;
      console.log('Image size:', size);

      if (type === 'original') {
         this.allOriginalSizes[index] = size;
      } else if (type === 'resized') {
         this.allResizedSizes[index] = size;
      }

      // Manually trigger change detection
      this.cdr.detectChanges();
   }

   /**
    * Deletes a pair of images (original and resized) from the S3 bucket.
    * @param originalFilename The filename of the original image.
    * @param resizedFilename The filename of the resized image.
    * @param index The index of the image pair in the list.
    */
   deleteImagePair(originalFilename: string, resizedFilename: string, index: number): void {
      if (!originalFilename || !resizedFilename) {
         alert('Invalid image filenames provided.');
         return;
      }

      // Confirm deletion with the user
      const confirmDeletion = confirm(
         `Are you sure you want to delete the image pair:\nOriginal: ${originalFilename}\nResized: ${resizedFilename}?`
      );

      if (!confirmDeletion) {
         return;
      }

      const deletePayload = {
         originalFilename: originalFilename,
         resizedFilename: resizedFilename,
      };

      this.http
         .post<any>('http://MyFlixLoadBalancer-308488375.us-east-2.elb.amazonaws.com/delete-image', deletePayload)
         .subscribe(
            (response) => {
               console.log('Deletion successful:', response);
               alert('Images deleted successfully.');

               // Remove the deleted images from the local arrays
               this.removeImageFromLists(originalFilename, resizedFilename, index);
            },
            (error: HttpErrorResponse) => {
               console.error('Error deleting images:', error);
               alert('Error deleting images. Please try again.');
            }
         );
   }

   /**
    * Removes the deleted images from the local image lists.
    * @param originalFilename The filename of the original image.
    * @param resizedFilename The filename of the resized image.
    * @param index The index of the image pair in the list.
    */
   private removeImageFromLists(originalFilename: string, resizedFilename: string, index: number): void {
      const originalIndex = this.allOriginalFilenames.indexOf(originalFilename);
      const resizedIndex = this.allResizedFilenames.indexOf(resizedFilename);

      if (originalIndex !== -1) {
         this.allOriginalFilenames.splice(originalIndex, 1);
         this.allOriginalImages.splice(originalIndex, 1);
         this.allOriginalSizes.splice(originalIndex, 1); // Remove size
      }

      if (resizedIndex !== -1) {
         this.allResizedFilenames.splice(resizedIndex, 1);
         this.allResizedImages.splice(resizedIndex, 1);
         this.allResizedSizes.splice(resizedIndex, 1); // Remove size
      }
   }
   /**
 * Generates a unique cache-busting parameter to prevent caching.
 */
   cacheBust(): string {
      return new Date().getTime().toString();
   }
}
