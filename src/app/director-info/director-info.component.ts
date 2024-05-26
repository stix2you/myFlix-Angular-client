/**
 * @component DirectorInfoComponent
 * @description Component to display information about a director in a dialog.
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
   selector: 'app-director-info',
   templateUrl: './director-info.component.html',
   styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent {
   /**
   * @description Constructor for DirectorInfoComponent.
   * @param {any} data - The data injected into the dialog.
   */
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
   // Inject data into the dialog, any data passed to the dialog is stored in the data property
   // This is to display the director information in the dialog modal
}

