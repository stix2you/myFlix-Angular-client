import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

   constructor(
      private fetchApiData: FetchApiDataService,
      public snackBar: MatSnackBar
   ) { }

   ngOnInit(): void {
      this.getFavoriteMovies();
   }

   getFavoriteMovies(): void {
      const username = localStorage.getItem('username');
      console.log('Fetching user profile for username:', username);
      if (username) {
         this.fetchApiData.getUserProfile(username).subscribe((response: any) => {
            console.log('User profile response:', response);
            const favoriteMovieTitles = response.favorite_movies;
            console.log('Favorite movie titles:', favoriteMovieTitles);
            this.favorites = [];
            favoriteMovieTitles.forEach((title: string) => {
               console.log('Fetching movie details for title:', title);
               this.fetchApiData.getOneMovie(title).subscribe(
                  (movie: any) => {
                     console.log('Fetched movie details:', movie);
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
      console.log('Filtered movies after applying filters:', this.filteredMovies);
   }

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

   removeFromFavorites(movie: any): void {
      console.log(`Attempting to remove movie from favorites: ${movie.Title}`);
      this.fetchApiData.removeFavoriteMovie(movie.Title).subscribe((response) => {
         this.snackBar.open(`${movie.Title} has been removed from your favorites!`, 'OK', {
            duration: 2000
         });
         this.getFavoriteMovies(); // Refresh favorites after removing one
      }, (error) => {
         console.error('Error removing movie from favorites:', error);
         this.snackBar.open('Failed to remove from favorites', 'OK', {
            duration: 2000
         });
      });
   }
}
