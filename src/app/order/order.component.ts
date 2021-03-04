import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order';
import { FilterPipe } from 'app/pipe/filter.pipe';
import { SorterPipe } from 'app/pipe/sorter.pipe';
import { ToastrService } from 'ngx-toastr';
import { Filter } from 'app/model/filter';
import { Sorter } from 'app/model/sorter';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;


  filter: Filter = new Filter();
  sorter: Sorter = new Sorter();
  dataSource: any;
  // 2.) - Observable
  //addressList: Observable<Address[]>;

  displayedColumns = ['id', 'customerID', 'productID', 'quantity', 'amount', 'status', 'edit', 'delete'];
  columns: any[] = [
    {
      name: 'id',
      title: 'No.',
      footer: 0
    },
    {
      name: 'customerID',
      title: 'Customer ID',
      footer: 0
    },
    {
      name: 'productID',
      title: 'Product Id',
      footer: 0
    },
    {
      name: 'quantity',
      title: 'Quantity',
      footer: 0
    },
    {
      name: 'amount',
      title: 'Amount',
      footer: 0
    },
    {
      name: 'status',
      title: 'Status',
      footer: 0
    },
  ];
  filterPipe: FilterPipe = new FilterPipe();
  sorterPipe: SorterPipe = new SorterPipe();
  subscribeForDeleteItem: Order = new Order();
  orderList: Order[];
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
  ) {
    // 2.) - Observable  
    //  this.addressX = this.orderService.getAll();
  }

  ngOnInit(): void {
    this.filter.selectedKeyForSearch = 'id';
    this.sorter.sortKey = 'id';
    this.orderService.getAll();
    this.orderList$.subscribe(list => {
      this.orderList = list;
      this.dataSource = new MatTableDataSource(list);
    });
  }

  subscribeForDelete(subscribeForDeleteItem: Order): void {
    this.subscribeForDeleteItem = subscribeForDeleteItem;
  }

  delete(): void {
    this.orderService.remove(this.subscribeForDeleteItem);
    this.toastr.success('Succesfully deleted!', 'Editor message:');
  }

  changeFilter(filter: Filter): void {
    this.filter = filter;
    this.orderList$.subscribe(list => {
      this.orderList = this.filterPipe.transform(list, this.filter.phrase, this.filter.selectedKeyForSearch, this.filter.phrase2);
      this.dataSource = new MatTableDataSource(this.orderList);
      this.sorting();
    });
  }

  selectColumnForSort(col: string): void {
    if (col === 'productID' || col === 'quantity') { return };
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
    this.sorting();
  }
  sorting() {
    this.dataSource = new MatTableDataSource(this.sorterPipe.transform(this.orderList, this.sorter.sortKey, this.sorter.sortAscend));
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    this.displayedColumns = this.moveItemInArray(this.displayedColumns, event.previousIndex + 1, event.currentIndex + 1);
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

  // returnVariablesFromColumnName(element: Order, name: string): string {
  //   const arr = name.split('.')[0].split('[')[0];
  //   const key = 'element' + "['" + arr + "']" + name.replace(arr, '');
  //   return (eval(key));
  // }

}
