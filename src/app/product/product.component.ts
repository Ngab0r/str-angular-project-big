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
import { ToastrService } from 'ngx-toastr';

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
      title: 'No.',
      footer: 0
    },
    {
      name: 'name',
      title: 'Name',
      footer: 0
    },
    {
      name: 'title',
      title: 'Title',
      footer: 0
    },
    {
      name: 'year',
      title: 'Year',
      footer: 0
    },
    {
      name: 'type',
      title: 'Type',
      footer: 0
    },
    {
      name: 'catID',
      title: 'Catedory Id',
      footer: 0
    },
    {
      name: 'description',
      title: 'Description',
      footer: 0
    },
    {
      name: 'price',
      title: 'Price',
      footer: 0
    },
    {
      name: 'active',
      title: 'Active',
      footer: 0
    },
  ];
  filterPipe: FilterPipe = new FilterPipe();
  sorterPipe: SorterPipe = new SorterPipe();
  subscribeForDeleteItem: Product = new Product();
  productList: Product[];
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
  ) {
    // 2.) - Observable  
    //  this.addressX = this.productService.getAll();
  }

  ngOnInit(): void {
    this.filter.selectedKeyForSearch = 'name';
    this.sorter.sortKey = 'name';
    this.productService.getAll();
    this.productList$.subscribe(list => {
      this.productList = list;
      this.dataSource = new MatTableDataSource(list);
    });
  }

  subscribeForDelete(subscribeForDeleteItem: Product): void {
    this.subscribeForDeleteItem = subscribeForDeleteItem;
  }

  delete(): void {
    this.productService.remove(this.subscribeForDeleteItem);
    this.toastr.success('Succesfully deleted!', 'Editor message:');
  }

  changeFilter(filter: Filter): void {
    this.filter = filter;
    this.productList$.subscribe(list => {
      this.productList = this.filterPipe.transform(list, this.filter.phrase, this.filter.selectedKeyForSearch, this.filter.phrase2);
      this.dataSource = new MatTableDataSource(this.productList);
      this.sorting();
    });
  }

  selectColumnForSort(col: string): void {
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
    this.sorting();
  }
  sorting() {
    this.dataSource = new MatTableDataSource(this.sorterPipe.transform(this.productList, this.sorter.sortKey, this.sorter.sortAscend));
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
