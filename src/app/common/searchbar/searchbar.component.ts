import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/model/filter';
import { Sorter } from 'src/app/model/sorter';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-searcbar',
  templateUrl: './searcbar.component.html',
  styleUrls: ['./searcbar.component.scss']
})
export class SearcbarComponent implements OnInit {

  @Input() filter: Filter;
  @Input() sorter: Sorter;
  @Input() usedFilterType: string | undefined;
  @Input() usedSortType: string | undefined;
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

  }
  onChangePhrase2(event: Event): void {
    this.filter.phrase2 = (event.target as HTMLInputElement).value;
    // this.filterChange.emit(this.filter);

  }


  selectKeyForSearch(key: string): void {
    this.filter.selectedKeyForSearch = key;
    if (this.filter.selectedKeyForSearch !== 'price') {
      this.filter.phrase = '';
      this.filter.phrase2 = '';
    }
    // this.filterChange.emit(this.filter);
  }

  selectColumnForSort(column: string): void {
    this.sorter.sortKey = column;
    // this.sorterChange.emit(this.sorter);

  }

  changeSortAscend(): void {
    this.sorter.sortAscend = !this.sorter.sortAscend;
    // this.sorterChange.emit(this.sorter);

  }

}
