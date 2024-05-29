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

   constructor(
      private router: Router,
      private snackBar: MatSnackBar,
      private fetchApiData: FetchApiDataService
   ) { }

   logout(): Observable<void> {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['welcome']);
      return of(); // Return an observable
   }

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
