import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Columns } from 'app/model/columns';
import { Customer } from 'app/model/customer';
import { Filter } from 'app/model/filter';
import { Sorter } from 'app/model/sorter';
import { FilterPipe } from 'app/pipe/filter.pipe';
import { SorterPipe } from 'app/pipe/sorter.pipe';
import { CustomerService } from 'app/service/customer.service';
import { BehaviorSubject } from 'rxjs';
import { ICustomer } from '../model/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  // 1.) - Behaviorsubject
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;

  filter: Filter = new Filter();
  sorter: Sorter = new Sorter();
  dataSource: any;
  // 2.) - Observable
  //addressList: Observable<Address[]>;

  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'address.zip', 'address.country', 'address.city', 'address.street', 'active', 'edit', 'delete'];
  columns: Columns[] = [
    {
      name: 'id',
      title: 'No.'
    },
    {
      name: 'firstName',
      title: 'First Name'
    },
    {
      name: 'lastName',
      title: 'Last Name'
    },
    {
      name: 'email',
      title: 'Email'
    },
    {
      name: 'address.zip',
      title: 'Address Zip'
    },
    {
      name: 'address.country',
      title: 'Address Country'
    },
    {
      name: 'address.city',
      title: 'Address City'
    },
    {
      name: 'address.street',
      title: 'Address Street'
    },
    {
      name: 'active',
      title: 'Active'
    },
  ];
  filterPipe: FilterPipe = new FilterPipe();
  sorterPipe: SorterPipe = new SorterPipe();
  subscribeForDeleteItem: Customer = new Customer({});
  customerList: Customer[];

  constructor(
    private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.filter.selectedKeyForSearch = 'firstName';
    this.customerService.getAll();
    this.customerList$.subscribe(list => {
      this.customerList = list;
      this.dataSource = new MatTableDataSource(list);
    });
  }

  subscribeForDelete(subscribeForDeleteItem: Customer): void {
    console.log(subscribeForDeleteItem);
    this.subscribeForDeleteItem = subscribeForDeleteItem;
  }

  delete(): void {
    this.customerService.remove(this.subscribeForDeleteItem);
  }

  changeFilter(filter: Filter): void {
    this.filter = filter;
    console.log(this.filter.selectedKeyForSearch);
    this.customerList$.subscribe(list => {
      this.customerList = this.filterPipe.transform(list, this.filter.phrase, this.filter.selectedKeyForSearch, this.filter.phrase2);
      this.dataSource = new MatTableDataSource(this.customerList);
      this.sorting();
    });
  }

  selectColumnForSort(col: string): void {
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
    this.sorting();
  }
  sorting() {
    this.dataSource = new MatTableDataSource(this.sorterPipe.transform(this.customerList, this.sorter.sortKey, this.sorter.sortAscend));
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

  returnVariablesFromColumnName(element: Customer, name: string): string {
    const arr = name.split('.')[0].split('[')[0];
    const key = 'element' + "['" + arr + "']" + name.replace(arr, '');
    return (eval(key));
  }



}
