import { Component, EventEmitter, Output } from '@angular/core';

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

