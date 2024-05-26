/**
 * @component AppComponent
 * @description The root component of the application.
 */
import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent {
   /**
   * @description The title of the application.
   */
   title = 'myFlix-Angular-client';
}