/**
 * @component NavBarComponent
 * @description Component for the navigation bar of the application.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-nav-bar',
   templateUrl: './nav-bar.component.html',
   styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {
   
   /**
   * @description The search term entered by the user.
   */
   searchTerm: string = '';

   /**
   * @description Constructor for NavBarComponent.
   * @param {Router} router - The router service to navigate between views.
   */
   constructor(private router: Router) { }

   /**
   * @description Checks if the user is logged in.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
   isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
   }

   /**
   * @description Logs the user out, clears local storage, and navigates to the welcome page.
   */
   logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['welcome']);
   }
}

