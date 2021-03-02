import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Address } from '../model/address';
import { Product } from 'app/model/product';
import { Filter } from 'app/model/filter';
import { Sorter } from 'app/model/sorter';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FilterPipe } from '../pipe/filter.pipe';
import { SorterPipe } from 'app/pipe/sorter.pipe';

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

  displayedColumns = ['image', 'id', 'name', 'title', 'year', 'type', 'catID', 'description', 'price', 'active', 'edit', 'delete'];
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
      title: 'Title'
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
  filterPipe: FilterPipe = new FilterPipe();
  sorterPipe: SorterPipe = new SorterPipe();
  subscribeForDeleteItem: Product = new Product();

  constructor(
    private productService: ProductService,
  ) {
    // 2.) - Observable  
    //  this.addressX = this.productService.getAll();
  }

  ngOnInit(): void {
    this.productService.getAll();
    this.productList$.subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
    });
  }

  subscribeForDelete(subscribeForDeleteItem: Product): void {
    this.subscribeForDeleteItem = subscribeForDeleteItem;
  }

  delete(): void {
    this.productService.remove(this.subscribeForDeleteItem);
  }

  changeFilter(filter: Filter): void {
    this.filter = filter;
    this.productList$.subscribe(list => {
      this.dataSource = new MatTableDataSource(this.filterPipe.transform(list, this.filter.phrase, this.filter.selectedKeyForSearch, this.filter.phrase2));
    });
  }

  selectColumnForSort(col: string): void {
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
    this.productList$.subscribe(list => {
      this.dataSource = new MatTableDataSource(this.sorterPipe.transform(list, this.sorter.sortKey, this.sorter.sortAscend));
    });
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

}
