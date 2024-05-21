// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'


@Component({
   selector: 'app-movie-card',
   templateUrl: './movie-card.component.html',
   styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
   movies: any[] = [];  // stores the movies data from the API
   constructor(public fetchApiData: FetchApiDataService) { }

   // This method will fetch the movies when the Angular is done creating the component
   ngOnInit(): void {
      this.getMovies();
   }

   // This method will fetch the movies from the API using the FetchApiDataService
   getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
         this.movies = resp;
         console.log(this.movies);
         return this.movies;
      });
   }
}