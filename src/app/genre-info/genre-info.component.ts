/**
 * @component GenreInfoComponent
 * @description Component to display information about a genre in a dialog.
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
   selector: 'app-genre-info',
   templateUrl: './genre-info.component.html',
   styleUrls: ['./genre-info.component.scss']
})

export class GenreInfoComponent {
   /**
   * @description Constructor for GenreInfoComponent.
   * @param {any} data - The data injected into the dialog.
   */
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }  
   // Inject data into the dialog, any data passed to the dialog is stored in the data property
   // This is to display the genre information in the dialog modal
}

