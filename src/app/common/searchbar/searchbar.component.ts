import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'app/model/filter';
//import { Sorter } from 'src/app/model/sorter';
import { ConfigService } from 'app/service/config.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Input() filter: Filter;
  //@Input() sorter: Sorter;
  @Input() usedFilterType: string | undefined;
  @Output() changeFilter: EventEmitter<Filter> = new EventEmitter();

  //@Input() usedSortType: string | undefined;
  // @Output() filterChange = new EventEmitter<Filter>();
  // @Output() sorterChange = new EventEmitter<Sorter>();

  // phrase: string = '';
  // phrase2: string = '';
  keys: string[] = this.config.tableCols.map(item => item.key);
  // selectedKeyForSearch: string = 'name';
  // sortKey: string = 'name';
  // sortAscend: boolean = true;


  constructor(private config: ConfigService,) { }

  ngOnInit(): void {
    console.log(this.filter);
  }

  onChangePhrase(event: Event): void {

    this.filter.phrase = (event.target as HTMLInputElement).value;
    // this.filterChange.emit(this.filter);
    this.changeFilter.emit(this.filter);

  }
  onChangePhrase2(event: Event): void {
    this.filter.phrase2 = (event.target as HTMLInputElement).value;
    // this.filterChange.emit(this.filter);
    this.changeFilter.emit(this.filter);

  }


  selectKeyForSearch(key: string): void {
    this.filter.selectedKeyForSearch = key;
    if (this.filter.selectedKeyForSearch !== 'price') {
      this.filter.phrase = '';
      this.filter.phrase2 = '';
    }
    this.changeFilter.emit(this.filter);

    // this.filterChange.emit(this.filter);
  }

  //   selectColumnForSort(column: string): void {
  //     this.sorter.sortKey = column;
  //     //this.sorterChange.emit(this.sorter);
  // 
  //   }
  // 
  //   changeSortAscend(): void {
  //     this.sorter.sortAscend = !this.sorter.sortAscend;
  //     //this.sorterChange.emit(this.sorter);
  // 
  //   }

}
