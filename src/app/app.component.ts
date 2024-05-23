// This file defines the root components of the application
import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

// Class that defines the component itself
export class AppComponent {
   title = 'myFlix-Angular-client';
}