// This file is where we create all the API calls for the client app
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://stix2you-myflix-5cbcd3c20372.herokuapp.com/';

@Injectable({
   providedIn: 'root'
})

export class FetchApiDataService {
   // Inject the HttpClient module to the constructor params
   // This will provide HttpClient to the entire class, making it available via this.http
   constructor(private http: HttpClient) {
   }

   // Making the api call for the user registration endpoint, public so it can be accessed by the registration component
   public userRegistration(userDetails: any): Observable<any> {
      return this.http.post(apiUrl + 'users', userDetails).pipe(
         catchError(this.handleError)
      );
   }

   // Making the api call for the user login endpoint, public so it can be accessed by the login component
   public userLogin(userDetails: any): Observable<any> {
      return this.http.post(apiUrl + 'login/', userDetails).pipe(
         catchError(this.handleError)
      );
   }

   // Making the api call for the user profile endpoint, public so it can be accessed by the profile component
   public getUserProfile(username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(`${apiUrl}users/${username}`, {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
         })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // Making the api call for the user profile update endpoint, public so it can be accessed by the profile component
   public updateUserProfile(username: string, userDetails: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(`${apiUrl}users/${username}`, userDetails, {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
         })
      }).pipe(
         catchError(this.handleError)
      );
   }

   // Making the api call for the user account deletion endpoint, public so it can be accessed by the profile component
   public deleteUserAccount(username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete(`${apiUrl}users/${username}`, {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
         })
      }).pipe(
         catchError(this.handleError)
      );
   }

   // Making the api call for the movie list endpoint, public so it can be accessed by the movie-details component
   public getGenreInfo(genre: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(`${apiUrl}genres/${genre}`, {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
         })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // Making the api call for the movie list endpoint, public so it can be accessed by the movie-details component
   public getDirectorInfo(director: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(`${apiUrl}directors/${director}`, {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
         })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // Making the api call for the movie list endpoint
   getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {
         headers: new HttpHeaders(
            {
               Authorization: 'Bearer ' + token,
            })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // Non-typed response extraction
   private extractResponseData(res: Object): any {
      const body = res;
      return body || {};
   }

   // This function will make a call to the database to retrieve a movie by title
   getOneMovie(title: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(`${apiUrl}movies/${title}`, {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
         })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to retrieve a director by name
   getDirector(name: String): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + `movies/director/${name}`, {
         headers: new HttpHeaders(
            {
               Authorization: 'Bearer ' + token,
            })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to retrieve a genre by name
   getGenre(name: String): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + `movies/genre/${name}`, {
         headers: new HttpHeaders(
            {
               Authorization: 'Bearer ' + token,
            })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to retrieve a user by username
   getUser(): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.get(apiUrl + `users/${username}`, {
         headers: new HttpHeaders(
            {
               Authorization: 'Bearer ' + token,
            })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to retrieve a user's favorite movies
   getFavoriteMovie(movie: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.get(apiUrl + `users/${username}/movies/${movie}`, {
         headers: new HttpHeaders(
            {
               Authorization: 'Bearer ' + token,
            })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to add a movie to a user's list of favorites
   public addFavoriteMovie(title: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username'); // Ensure correct retrieval of username
      return this.http.post(`${apiUrl}users/${username}/movies/${title}`, {}, {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
         })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to remove a movie from a user's list of favorites
   public removeFavoriteMovie(title: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      return this.http.delete(`${apiUrl}users/${username}/movies/${title}`, {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
         })
      }).pipe(
         map((response: any) => {
            return response || {};
         }),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to update a user's information
   editUser(userDetails: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.put(apiUrl + `users/${username}`, userDetails, {
         headers: new HttpHeaders(
            {
               Authorization: 'Bearer ' + token,
            })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to delete a user's account
   deleteUser(): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.delete(apiUrl + `users/${username}`, {
         headers: new HttpHeaders(
            {
               Authorization: 'Bearer ' + token,
            })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // This function will make a call to the database to delete a movie from a user's list of favorites
   deleteFavoriteMovie(title: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.delete(apiUrl + `users/${username}/movies/${title}`, {
         headers: new HttpHeaders(
            {
               Authorization: 'Bearer ' + token,
            })
      }).pipe(
         map(this.extractResponseData),
         catchError(this.handleError)
      );
   }

   // Error handling
   private handleError(error: HttpErrorResponse): Observable<any> {
      if (error.status === 200) {
         return of({});
      }
      if (error.error instanceof ErrorEvent) {
         console.error('An error occurred:', error.error.message);
      } else {
         console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`);
      }
      return throwError(
         'Operation failed; please try again later.');
   }
}