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

   constructor(
      private fetchApiData: FetchApiDataService,
      public snackBar: MatSnackBar,
      private router: Router
   ) { }

   // fetch the favorite movies when the Angular is done creating the component
   ngOnInit(): void {
      this.getFavoriteMovies();
   }

   // determine the font size of the movie titles based on their length
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

   // fetch the favorite movies from the API using the FetchApiDataService
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

   // apply filters to the list of favorite movies
   applyFilters(): void {
      let movies = [...this.favorites];

      // Filter by search term
      if (this.searchTerm) {
         movies = movies.filter(movie => movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }

      // Sort movies
      if (this.sortOrder === 'title-asc') {
         movies.sort((a, b) => a.Title.localeCompare(b.Title));
      } else if (this.sortOrder === 'title-desc') {
         movies.sort((a, b) => b.Title.localeCompare(a.Title));
      } else if (this.sortOrder === 'year-asc') {
         movies.sort((a, b) => a.ReleaseYear - b.ReleaseYear);
      } else if (this.sortOrder === 'year-desc') {
         movies.sort((a, b) => b.ReleaseYear - a.ReleaseYear);
      }

      // Limit movies
      this.filteredMovies = movies.slice(0, this.limit);
   }

   // Event handlers to trigger filters 
   onSearch(term: string): void {
      this.searchTerm = term;
      this.applyFilters();
   }
   onSort(order: string): void {
      this.sortOrder = order;
      this.applyFilters();
   }
   onLimitChange(limit: number): void {
      this.limit = limit;
      this.applyFilters();
   }

   // Navigate to the movie details view
   viewDetails(movieId: string): void {
      this.router.navigate(['movie', movieId]);
   }

   // Remove a movie from the user's list of favorite movies
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
