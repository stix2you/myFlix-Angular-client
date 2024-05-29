/**
 * @component AuthService
 * @description This component will handle the user authoriziation for login, registration, logout, and profile updates
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   /**
    * @description constructor for AuthService component
    * @param {Router} router 
    * @param {MatSnackBar} snackBar 
    * @param {FetchApiDataService} fetchApiData 
    */
   constructor(
      private router: Router,
      private snackBar: MatSnackBar,
      private fetchApiData: FetchApiDataService
   ) { }

   /**
    * @description This method will log the user out by removing the token and user info from local storage
    */
   logout(): Observable<void> {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['welcome']);
      return of();
   }

   /**
    * @description This method logs the user in
    * @param {any} userData - user login info
    */
   login(userData: any): Observable<any> {
      return this.fetchApiData.userLogin(userData).pipe(
         tap((result: any) => {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('username', result.user.username);
            localStorage.setItem('token', result.token);

            this.router.navigate(['movies']);
            this.snackBar.open('Login successful!', 'OK', {
               duration: 2000
            });
         }, (error) => {
            this.snackBar.open('Login Failed!', 'OK', {
               duration: 2000
            });
         })
      );
   }
}
