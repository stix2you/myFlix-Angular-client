/**
 * @component FavoriteMoviesComponent
 * @description Component to display and manage the user's favorite movies.
 */
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
   selector: 'app-favorite-movies',
   templateUrl: './favorite-movies.component.html',
   styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
   favorites: any[] = [];
   filteredMovies: any[] = [];
   searchTerm: string = '';
   sortOrder: string = 'title-asc';
   limit: number = 50;
   @Input() title: string = '';  // @Input decorator means the parent component can pass data to it
   fontClass: string = '';

   /**
   * @description Constructor for FavoriteMoviesComponent.
   * @param {FetchApiDataService} fetchApiData - The service to fetch API data.
   * @param {MatSnackBar} snackBar - The service to display snack bar messages.
   * @param {Router} router - The router service to navigate between views.
   */
   constructor(
      private fetchApiData: FetchApiDataService,
      public snackBar: MatSnackBar,
      private router: Router
   ) { }

   /**
   * @description Angular lifecycle hook that gets called after the component's view has been fully initialized.
   */
   ngOnInit(): void {
      this.getFavoriteMovies();
   }

   /**
   * @description Determines the font size of the movie titles based on their length.
   * @param {string} title - The title of the movie.
   * @returns {string} The CSS class for the font size.
   */
   getFontClass(title: string): string {
      const textLength = title.length;
      let fontClass: string;

      if (textLength > 50) {
         fontClass = 'small-font';
      } else if (textLength > 20) {
         fontClass = 'medium-font';
      } else {
         fontClass = 'large-font';
      }

      return fontClass;
   }

   /**
   * @description Fetches the user's favorite movies from the API.
   */
   getFavoriteMovies(): void {
      const username = localStorage.getItem('username');
      if (username) {
         this.fetchApiData.getUserProfile(username).subscribe((response: any) => {
            const favoriteMovieTitles = response.favorite_movies;
            this.favorites = [];
            favoriteMovieTitles.forEach((title: string) => {
               this.fetchApiData.getOneMovie(title).subscribe(
                  (movie: any) => {
                     this.favorites.push(movie);
                     this.applyFilters(); // Apply filters after fetching all movies
                  },
                  (error) => {
                     console.error('Error fetching movie details:', error);
                  }
               );
            });
         });
      }
   }

   /**
   * @description Applies filters to the list of favorite movies.
   */
   applyFilters(): void {
      let movies = this.favorites;
      // Filter by search term
      if (this.searchTerm) {
         movies = movies.filter(movie => movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      // Sort movies
      if (this.sortOrder === 'title-asc') {
         movies.sort((a, b) => a.Title.localeCompare(b.Title));
      } else if (this.sortOrder === 'title-desc') {
         movies.sort((a, b) => b.Title.localeCompare(a.Title));
      }
      // Limit movies
      this.filteredMovies = movies.slice(0, this.limit);
   }

   /**
   * @description Handles search term input and triggers filtering.
   * @param {string} term - The search term.
   */
   onSearch(term: string): void {
      this.searchTerm = term;
      this.applyFilters();
   }

   /**
   * @description Handles sort order change and triggers sorting.
   * @param {string} order - The sort order.
   */
   onSort(order: string): void {
      this.sortOrder = order;
      this.applyFilters();
   }

   /**
   * @description Handles limit change and triggers filtering.
   * @param {number} limit - The number of movies to display.
   */
   onLimitChange(limit: number): void {
      this.limit = limit;
      this.applyFilters();
   }

   /**
   * @description Navigates to the movie details view.
   * @param {string} title - The ID of the movie.
   */
   viewDetails(title: string): void {
      this.router.navigate(['movie', title], { queryParams: { from: 'favorites' } });
   }

   /**
   * @description Removes a movie from the user's list of favorite movies.
   * @param {any} movie - The movie to remove.
   */
   removeFromFavorites(movie: any): void {
      this.fetchApiData.removeFavoriteMovie(movie.Title).subscribe((response) => {
         this.snackBar.open(`${movie.Title} has been removed from your favorites!`, 'OK', {
            duration: 2000
         });
         this.getFavoriteMovies(); // Refresh favorites after removing one!!
      }, (error) => {
         console.error('Error removing movie from favorites:', error);
         this.snackBar.open('Failed to remove from favorites', 'OK', {
            duration: 2000
         });
      });
   }
}
