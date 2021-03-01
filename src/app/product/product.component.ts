import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Address } from '../model/address';
import { Product } from 'app/model/product';
import { Filter } from 'app/model/filter';
import { Sorter } from 'app/model/sorter';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  // 1.) - Behaviorsubject
  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  filter: Filter = new Filter();
  sorter: Sorter = new Sorter();
  dataSource: any;
  // 2.) - Observable
  //addressList: Observable<Address[]>;


  // displayedColumns = ['id', 'name', 'age', 'gender', 'country'];
  rows = [
    {
      id: '1',
      name: 'John',
      age: '21',
      gender: 'Male',
      country: 'UK'
    },
    {
      id: '2',
      name: 'Robin',
      age: '25',
      gender: 'Male',
      country: 'London'
    },
    {
      id: '3',
      name: 'Robert',
      age: '12',
      gender: 'Male',
      country: 'Dubai'
    },
    {
      id: '4',
      name: 'Neeraj',
      age: '23',
      gender: 'Male',
      country: 'India'
    },
    {
      id: '5',
      name: 'Wiliiams',
      age: '30',
      gender: 'Male',
      country: 'Ausralia'
    }
  ];

  displayedColumns = ['image', 'id', 'name', 'title', 'year', 'type', 'catID', 'description', 'price', 'active', 'edit'];
  columns: any[] = [


    {
      name: 'id',
      title: 'No.'
    },
    {
      name: 'name',
      title: 'Name'
    },
    {
      name: 'title',
      title: 'Age'
    },
    {
      name: 'year',
      title: 'Year'
    },
    {
      name: 'type',
      title: 'Type'
    },
    {
      name: 'catID',
      title: 'Catedory Id'
    },
    {
      name: 'description',
      title: 'Description'
    },
    {
      name: 'price',
      title: 'Price'
    },
    {
      name: 'active',
      title: 'Active'
    },
  ];

  constructor(
    private productService: ProductService,
  ) {
    // 2.) - Observable  
    //  this.addressX = this.productService.getAll();
  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.rows);
    this.productService.getAll();
    this.productList$.subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.filter = this.filter.selectedKeyForSearch;

    });

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      var dataa = this.productList$.name.filter(
        element => element.position === data.position);
      return data.position.toString().toLowerCase().includes(filter)
        || data.symbol.toLowerCase().includes(filter)
        || data.position.toString().toLowerCase() === filter
        || dataa[0].name.toString().toLowerCase().includes(filter.toLowerCase());
    };
    console.log(this.dataSource);
    this.dataSource.filter = 'abba';
    this.dataSource.filter = 'abba';
  }

  selectColumnForSort(col: string): void {
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    // if (event.currentIndex !== this.displayedColumns.length && event.currentIndex !== 0) {
    this.displayedColumns = this.moveItemInArray(this.displayedColumns, event.previousIndex + 1, event.currentIndex + 1);
    // }
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
