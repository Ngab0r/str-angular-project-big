import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Address } from '../model/address';
import { Product } from 'app/model/product';
import { Filter } from 'app/model/filter';
import { Sorter } from 'app/model/sorter';

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
  // 2.) - Observable
  //addressList: Observable<Address[]>;




  constructor(
    private productService: ProductService,
  ) {
    // 2.) - Observable  
    //  this.addressX = this.productService.getAll();
  }

  ngOnInit(): void {
    this.productService.getAll();
  }

  selectColumnForSort(col: string): void {
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
  }

}
