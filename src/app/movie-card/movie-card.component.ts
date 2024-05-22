// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';

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
   filteredMovies: any[] = [];
   searchTerm: string = '';
   sortOrder: string = 'title-asc';
   limit: number = 50;

   // constructor for the component that will call the necessary functions for the component to work
   constructor(public fetchApiData: FetchApiDataService, public snackBar: MatSnackBar) { }

   // This method will fetch the movies when the Angular is done creating the component
   ngOnInit(): void {
      this.getMovies();
   }

   // This method will fetch the movies from the API using the FetchApiDataService
   getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
         this.movies = resp;
         console.log(this.movies);
         this.applyFilters();
         return this.movies;
      });
   }


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
      } else if (this.sortOrder === 'year-asc') {
         movies.sort((a, b) => a.ReleaseYear - b.ReleaseYear);
      } else if (this.sortOrder === 'year-desc') {
         movies.sort((a, b) => b.ReleaseYear - a.ReleaseYear);
      }

      // Limit movies
      this.filteredMovies = movies.slice(0, this.limit);
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
}