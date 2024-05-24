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

   constructor() { }

   // the following ngOnInit, listener, and functions are all to handle the toggle of the filter section on small screens
   ngOnInit(): void {
      this.checkScreenWidth();
   }

   // Listen for window resize event
   @HostListener('window:resize', ['$event'])
   onResize(event: any): void {
      this.checkScreenWidth();
   }

   // Check screen width on page
   checkScreenWidth(): void {
      this.isScreenSmall = window.innerWidth < 950;
      if (!this.isScreenSmall) {
         this.showFilters = false; // Reset filters visibility when screen is large!
      }
   }

   // Toggle filters visibility in the html/dom
   toggleFilters(): void {
      this.showFilters = !this.showFilters;
   }

   // Emit is used to send data from the child component to the parent component
   // Needed in this case because the parent component, movie-card, will handle the 
   // actual filtering, sorting, and limiting of the data
   onSearch(): void {
      this.search.emit(this.searchTerm);
   }
   onSort(): void {
      this.sort.emit(this.sortOrder);
   }
   onLimit(): void {
      this.limitChange.emit(this.limit);
   }
}

