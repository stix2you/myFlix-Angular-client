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
   
   /**
   * @description The movie object containing detailed information about the movie.
   */
   movie: any = {};

   /**
   * @description Constructor for MovieDetailComponent.
   * @param {ActivatedRoute} route - The route that contains the movie title parameter.
   * @param {Router} router - The router service to navigate between views.
   * @param {FetchApiDataService} fetchApiData - The service to fetch API data.
   * @param {MatSnackBar} snackBar - The service to display snack bar messages.
   * @param {MatDialog} dialog - The dialog service to open dialogs.
   */
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fetchApiData: FetchApiDataService,
      public snackBar: MatSnackBar,
      public dialog: MatDialog
   ) { }

   /**
   * @description Angular lifecycle hook that gets called after the component's view has been fully initialized.
   */
   ngOnInit(): void {
      const movieTitle = this.route.snapshot.paramMap.get('title');
      if (movieTitle) {
         this.getMovieDetails(movieTitle);
      } else {
         // Handle the case where movie title is null (throw error to console, display message, and navigate if appropriate
         console.error('Movie Title is null');
         this.snackBar.open('Error fetching movie details!', 'OK', {
            duration: 2000
         });
         this.router.navigate(['movies']);
      }
   }

   /**
   * @description Fetches the details of a movie using the FetchApiDataService.
   * @param {string} title - The title of the movie.
   */
   getMovieDetails(title: string): void {
      this.fetchApiData.getOneMovie(title).subscribe((response: any) => {
         this.movie = response;
      }, (error) => {
         console.error('Error fetching movie details:', error);
         this.snackBar.open('Failed to fetch movie details', 'OK', {
            duration: 2000
         });
      });
   }
   
   /**
   * @description Adds a movie to the user's list of favorite movies.
   * @param {any} movie - The movie to add.
   */
   addToFavorites(movie: any): void {
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe((response) => {
         this.snackBar.open(`${movie.Title} has been added to your favorites!`, 'OK', {
            duration: 2000
         });
      }, (error) => {
         console.error('Error adding movie to favorites:', error);
         this.snackBar.open('Failed to add to favorites', 'OK', {
            duration: 2000
         });
      });
   }

   /**
   * @description Opens a dialog to display information about a genre.
   * @param {string} genre - The genre to display information about.
   */
   viewGenre(genre: string): void {
      this.fetchApiData.getGenreInfo(genre).subscribe((response: any) => {  // Fetch genre info from the API
         this.dialog.open(GenreInfoComponent, {                            // Open the dialog component
            data: { genre: response },                                    // Pass the genre info to the dialog component
            panelClass: 'custom-dialog-container'
         });
      }, (error) => {
         console.error('Error fetching genre info:', error);
         this.snackBar.open('Failed to fetch genre information', 'OK', {
            duration: 2000
         });
      });
   }

   /**
   * @description Opens a dialog to display information about a director.
   * @param {string} director - The director to display information about.
   */
   viewDirector(director: string): void {
      this.fetchApiData.getDirectorInfo(director).subscribe((response: any) => {
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

   /**
   * @description Navigates back to the movies view.
   */
   goBack(): void {
      this.router.navigate(['movies']);
   }
}
