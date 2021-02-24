import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Address } from '../model/address';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /* list: Address[] = [
    {
      id: 9,
      zip: "123",
      country: "music",
      city: "12",
      street: "xzy",
      notes: "432xxxxxxxxxxxx",
    },
  ]; */


  private listUrl: string = "http://localhost:3000/products";

  // product.service.ts fileban levo adatok megjelenitesehez
  list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  // 1.) - BehaviorSubject
  getAll(): void {
    this.http.get<Product[]>(this.listUrl).subscribe(
      product => this.list$.next(product)
    );
  }





  //2.) - Observable
  /* getAll(): Observable<Address[]> {
    return this.http.get<Address[]>(this.listUrl);
  } */



  // 3.) - product.service.ts fileban levo adatok megjelenitesehez
  /* 
  getAll(): void {
    this.list$.next(this.list); 
  }
  */

}
