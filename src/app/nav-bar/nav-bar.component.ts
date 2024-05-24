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

   // only show navbar if user is logged in, function called in the HTML
   isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
   }

   // cleanup after logout, navigate to welcome page
   logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['welcome']);
   }
}

