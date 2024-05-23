import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
   selector: 'app-genre-info',
   templateUrl: './genre-info.component.html',
   styleUrls: ['./genre-info.component.scss']
})
export class GenreInfoComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }  // Inject data into the dialog, any data passed to the dialog is stored in the data property
}

