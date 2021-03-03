import { Component, OnInit } from '@angular/core';
import { Bill } from 'app/model/bill';
import { BillService } from 'app/service/bill.service';
import { BehaviorSubject } from 'rxjs';

import { Filter } from 'app/model/filter';
import { Sorter } from 'app/model/sorter';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FilterPipe } from '../pipe/filter.pipe';
import { SorterPipe } from 'app/pipe/sorter.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  // 1.) - Behaviorsubject
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;

  filter: Filter = new Filter();
  sorter: Sorter = new Sorter();
  dataSource: any;

  // 2.) - Observable
  //addressList: Observable<Address[]>;


  displayedColumns = ['id', 'orderID', 'status', 'amount', 'edit', 'delete'];
  columns: any[] = [
    {
      name: 'id',
      title: 'Id'
    },
    {
      name: 'orderID',
      title: 'OrderID'
    },
    {
      name: 'status',
      title: 'Status'
    },
    {
      name: 'amount',
      title: 'Amount'
    },
  ];
  filterPipe: FilterPipe = new FilterPipe();
  sorterPipe: SorterPipe = new SorterPipe();
  subscribeForDeleteItem: Bill = new Bill();
  billList: Bill[];

  constructor(
    private billService: BillService,
    private toastr: ToastrService,
  ) {
    // 2.) - Observable  
    //  this.addressX = this.productService.getAll();
  }

  ngOnInit(): void {
    this.filter.selectedKeyForSearch = 'amount';
    this.sorter.sortKey = 'id';
    this.billService.getAll();
    this.billList$.subscribe(list => {
      this.billList = list;
      this.dataSource = new MatTableDataSource(list);
    });
  }

  subscribeForDelete(subscribeForDeleteItem: Bill): void {
    this.subscribeForDeleteItem = subscribeForDeleteItem;
  }

  delete(): void {
    this.billService.remove(this.subscribeForDeleteItem);
    this.toastr.success('Succesfully deleted!', 'Editor message:');
  }

  changeFilter(filter: Filter): void {
    this.filter = filter;
    this.billList$.subscribe(list => {
      this.billList = this.filterPipe.transform(list, this.filter.phrase, this.filter.selectedKeyForSearch, this.filter.phrase2);
      this.dataSource = new MatTableDataSource(this.billList);
      this.sorting();
    });
  }

  selectColumnForSort(col: string): void {
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
    this.sorting();
  }
  sorting() {
    this.dataSource = new MatTableDataSource(this.sorterPipe.transform(this.billList, this.sorter.sortKey, this.sorter.sortAscend));
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    this.displayedColumns = this.moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  moveItemInArray(array: any[], prev: number, curr: number) {
    if (curr >= array.length) {
      let k = curr - array.length + 1;
      while (k--) {
        array.push(undefined);
      }
    }
    array.splice(curr, 0, array.splice(prev, 1)[0]);
    return array
  }

}
