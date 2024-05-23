import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';


@Component({
   selector: 'app-movie-detail',
   templateUrl: './movie-detail.component.html',
   styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
   movie: any = {};

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fetchApiData: FetchApiDataService,
      public snackBar: MatSnackBar,
      public dialog: MatDialog
   ) { }

   ngOnInit(): void {
      const movieTitle = this.route.snapshot.paramMap.get('title');
      console.log('Movie Title:', movieTitle);
      if (movieTitle) {
         this.getMovieDetails(movieTitle);
      } else {
         // Handle the case where movie title is null (e.g., navigate back to the movie list or show an error message)
         console.error('Movie Title is null');
         this.router.navigate(['movies']);
      }
   }

   getMovieDetails(title: string): void {
      this.fetchApiData.getOneMovie(title).subscribe((response: any) => {
         this.movie = response;
      }, (error) => {
         console.error('Error fetching movie details:', error);
      });
   }

   addToFavorites(movie: any): void {
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe((response) => {
         this.snackBar.open(`${movie.Title} has been added to your favorites!`, 'OK', {
            duration: 2000
         });
      }, (error) => {
         this.snackBar.open('Failed to add to favorites', 'OK', {
            duration: 2000
         });
      });
   }

   // viewGenre(genre: string): void {
   //    this.fetchApiData.getGenreInfo(genre).subscribe((response: any) => {
   //       console.log('Genre Info:', response);
   //       // Display genre info (use a modal or another method to show the info)
   //    }, (error) => {
   //       console.error('Error fetching genre info:', error);
   //    });
   // }
   viewGenre(genre: string): void {
      this.fetchApiData.getGenreInfo(genre).subscribe((response: any) => {  // Fetch genre info from the API
         console.log('Genre Info:', response);        // Log the genre info to the console, we are getting this info from the API
         this.dialog.open(GenreInfoComponent, {   // Open the dialog component
            data: { genre: response },                     // Pass the genre info to the dialog component
            panelClass: 'custom-dialog-container'
         });
      }, (error) => {
         console.error('Error fetching genre info:', error);
         this.snackBar.open('Failed to fetch genre information', 'OK', {
            duration: 2000
         });
      });
   }

   // viewDirector(director: string): void {
   //    this.fetchApiData.getDirectorInfo(director).subscribe((response: any) => {
   //       console.log('Director Info:', response);
   //       // Display director info (use a modal or another method to show the info)
   //    }, (error) => {
   //       console.error('Error fetching director info:', error);
   //    });
   // }

   viewDirector(director: string): void {
      this.fetchApiData.getDirectorInfo(director).subscribe((response: any) => {
         console.log('Director Info:', response);
         this.dialog.open(DirectorInfoComponent, {
            data: { director: response },
            panelClass: 'custom-dialog-container'
         });
      }, (error) => {
         console.error('Error fetching director info:', error);
         this.snackBar.open('Failed to fetch director information', 'OK', {
            duration: 2000
         });
      });
   }

   goBack(): void {
      this.router.navigate(['movies']);
   }
}
