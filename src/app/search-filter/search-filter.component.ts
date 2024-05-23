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

   ngOnInit(): void {
      this.checkScreenWidth();
   }

   @HostListener('window:resize', ['$event'])
   onResize(event: any): void {
      this.checkScreenWidth();
   }

   checkScreenWidth(): void {
      this.isScreenSmall = window.innerWidth < 950;
      if (!this.isScreenSmall) {
         this.showFilters = false; // Reset filters visibility when screen is large
      }
   }

   toggleFilters(): void {
      this.showFilters = !this.showFilters;
   }

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

