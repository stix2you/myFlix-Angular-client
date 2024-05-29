/**
 * @component SearchFilterComponent
 * @description Component for handling search, sort, and limit functionality in the application.
 */
import { Component, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
   selector: 'app-search-filter',
   templateUrl: './search-filter.component.html',
   styleUrls: ['./search-filter.component.scss']
})

export class SearchFilterComponent {
   @Output() search = new EventEmitter<string>();
   @Output() sort = new EventEmitter<string>();
   @Output() limitChange = new EventEmitter<number>();

   searchTerm: string = '';
   sortOrder: string = 'title-asc';
   limit: number = 50;
   isScreenSmall: boolean = false;
   showFilters: boolean = false;

   /**
   * @description Constructor for SearchFilterComponent.
   */
   constructor() { }

   /**
   * @description Listens for window resize event to check screen width.
   * @param {any} event - The resize event.
   */
   @HostListener('window:resize', ['$event'])
   onResize(event: any): void {
      this.checkScreenWidth();
   }

   /**
   * @description Angular lifecycle hook that gets called after the component's view has been fully initialized.
   */
   ngOnInit(): void {
      this.checkScreenWidth();
   }

   /**
   * @description Checks the screen width and sets the isScreenSmall and showFilters properties accordingly.
   */
   checkScreenWidth(): void {
      this.isScreenSmall = window.innerWidth < 950;
      if (!this.isScreenSmall) {
         this.showFilters = false; // Reset filters visibility when screen is large!
      }
   }

   /**
   * @description Toggles the visibility of the filters.
   */
   toggleFilters(): void {
      this.showFilters = !this.showFilters;
   }

   // Emit is used to send data from the child component to the parent component
   // Needed in this case because the parent component, movie-card, will handle the 
   // actual filtering, sorting, and limiting of the data
   
   /**
   * @description Emits the search term to the parent component.
   */
   onSearch(): void {
      this.search.emit(this.searchTerm);
   }

   /**
   * @description Emits the sort order to the parent component.
   */
   onSort(): void {
      this.sort.emit(this.sortOrder);
   }

   /**
   * @description Emits the limit to the parent component.
   */
   onLimit(): void {
      this.limitChange.emit(this.limit);
   }
}

