/**
 * @component MovieCardComponent
 * @description Component to display and manage a list of movies. The list is sortable and filterable.
 */
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// this component will render the movies in the database on a main page
// the list will be sortable by title, genre, director, actor, and year.  It will be filterable by these same categories.
// there will be a search bar which will search all categories for the search term and display the results.
// each movie will have a clickable link to the movie view page
// each movie will have an icon to add it to the user's favorites list
@Component({
   selector: 'app-movie-card',
   templateUrl: './movie-card.component.html',
   styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
   movies: any[] = [];
   username: any = localStorage.getItem('username');
   filteredMovies: any[] = [];
   favoriteMovies: any[] = [];
   searchTerm: string = '';
   sortOrder: string = 'title-asc';
   limit: number = 50;
   @Input() title: string = '';  // @Input decorator means the parent component can pass data to it
   fontClass: string = '';

   /**
   * @description Constructor for MovieCardComponent.
   * @param {FetchApiDataService} fetchApiData - The service to fetch API data.
   * @param {MatSnackBar} snackBar - The service to display snack bar messages.
   * @param {Router} router - The router service to navigate between views.
   */
   constructor(
      public fetchApiData: FetchApiDataService,
      public snackBar: MatSnackBar,
      private router: Router
   ) { }

   /**
   * @description Angular lifecycle hook that gets called after the component's view has been fully initialized.
   */
   ngOnInit(): void {
      this.getMovies();
      this.getFavoriteMovies();
   }

   getFavoriteMovies(): void {
      this.fetchApiData.getUserProfile(this.username).subscribe((resp: any) => {
         this.favoriteMovies = resp.favorite_movies;
         return this.favoriteMovies;
      });
   }

   isFavorite(movie: any): boolean {
      return this.favoriteMovies.includes(movie.Title);
   }


   /**
    * @description Returns the appropriate font class based on the title length.
    * @param {string} title - The title of the movie.
    * @returns {string} - The font class to use.
    */
   getFontClass(title: string): string {
      const textLength = title.length;
      let fontClass: string;
      // Title font size adjustment for large titles: adjust font size breakpoints as needed below
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
   * @description Fetches the movies from the API using the FetchApiDataService.
   */
   getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
         this.movies = resp;
         this.applyFilters();
         return this.movies;
      });
   }

   /**
   * @description Applies filters to the movies list based on the search term, sort order, and limit.
   */
   applyFilters(): void {
      let movies = this.movies;
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
   * @param {string} movieId - The ID of the movie.
   */
   viewDetails(title: string): void {
      this.router.navigate(['movie', title], { queryParams: { from: 'main' } });
   }

   /**
   * @description Adds a movie to the user's list of favorite movies.
   * @param {any} movie - The movie to add.
   */
   addToFavorites(movie: any): void {
      this.fetchApiData.addFavoriteMovie(movie.Title).subscribe((response) => {
         this.favoriteMovies.push(movie.Title);
         this.snackBar.open(`${movie.Title} has been added to your favorites!`, 'OK', {
            duration: 2000
         });
      }, (error) => {
         this.snackBar.open('Failed to add to favorites', 'OK', {
            duration: 2000
         });
      });
   }
}