import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Address } from '../model/address';
import { Product } from 'app/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  // 1.) - Behaviorsubject
  productList$: BehaviorSubject<Product[]> = this.productService.list$;

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

}
