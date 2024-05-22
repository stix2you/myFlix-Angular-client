import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-nav-bar',
   templateUrl: './nav-bar.component.html',
   styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
   searchTerm: string = '';

   constructor(private router: Router) { }

   isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
   }

   logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['welcome']);
   }

   searchMovies(): void {
      // Implement search logic here
      console.log('Search term:', this.searchTerm);
   }
}

