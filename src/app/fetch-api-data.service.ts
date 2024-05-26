/**
 * @service FetchApiDataService
 * @description Service to fetch data from the API.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// api url that will provide data for the client app
const apiUrl = 'https://stix2you-myflix-5cbcd3c20372.herokuapp.com/';

@Injectable({
   providedIn: 'root'
})

export class FetchApiDataService {

   /**
   * @description Constructor for FetchApiDataService
   * @param {HttpClient} http - The HTTP client for making requests
   */
   constructor(private http: HttpClient) {
   }

   /**
   * @description This method creates a new user profile
   * @param {any} userDetails - The details of the user to create
   * @returns {Observable<any>} An observable containing a new user object
   */
   public userRegistration(userDetails: any): Observable<any> {
      return this.http.post(apiUrl + 'users', userDetails).pipe(
         catchError(this.handleError)
      );
   }

   /**
   * @description This method logs in a user
   * @param {any} userDetails - The details of the user to log in
   * @returns {Observable<any>} An observable containing user object and token
   */
   public userLogin(userDetails: any): Observable<any> {
      return this.http.post(apiUrl + 'login/', userDetails).pipe(
         catchError(this.handleError)
      );
   }

   /**
   * @description This method retrieves user's profile data
   * @param {string} username - The username of the user
   * @returns {Observable<any>} An observable containing the user object
   */
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

   /**
    * @description This method updates a user's profile
    * @param {string} username - The username of the user to update
    * @param {any} userDetails - The details of the user to update
    * @returns {Observable<any>} An observable containing updated user object
    */
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

   /**
    * @description This method deletes a user's account
    * @param {string} username - The username of the user to delete
    * @returns {Observable<any>} An observable containing confirmation message of account deletion
    */
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

   /**
   * @description This method retrieves data about a genre by its name
   * @param {string} genre - The name of the genre to retrieve
   * @returns {Observable<any>} An observable containing the genre object
   */
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

   /**
   * @description This method retrieves data about a director by their name
   * @param {string} director - The name of the director to retrieve
   * @returns {Observable<any>} An observable containing the director object
   */
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

   /**
   * @description This method retrieves all movies from the API
   * @returns {Observable<any>} An observable containing an array of movie objects
   */
   public getAllMovies(): Observable<any> {
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

   /**
   * @description This method retrieves data about a single movie by its title
   * @param {string} title - The title of the movie to retrieve
   * @returns {Observable<any>} An observable containing the movie object
   */
   public getOneMovie(title: string): Observable<any> {
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

   /**
   * @description This method adds a movie to the user's list of favorite movies
   * @param {string} title - The title of the movie to add
   * @returns {Observable<any>} An observable containing the updated user object
   */
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

   /**
   * @description This method removes a single movie from the user's list of favorite movies
   * @param {string} title - The title of the movie to remove
   * @returns {Observable<any>} A confirmation message of movie removal
   */
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

   /**
   * @description This method extracts the response data from the API
   * @param {Object} res - The response object from the API
   * @returns {any} The response body or an empty object
   */
   private extractResponseData(res: Object): any {
      const body = res;   // if response is an object, return the response
      return body || {};   // return the body of the response or an empty object
   }

   /**
   * @description This method handles errors from the API
   * @param {HttpErrorResponse} error - The error response from the API
   * @returns {Observable<any>} An observable containing an error message
   */
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