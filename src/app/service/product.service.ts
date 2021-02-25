import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {




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

  get(id: number | string): Observable<Product | undefined> {
    id = parseInt(('' + id), 10);
    return this.http.get<Product>(`${this.listUrl}/${id}`);
  }


  //2.) - Observable
  /* getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.listUrl);
  } */



  // 3.) - product.service.ts fileban levo adatok megjelenitesehez
  /* 
  getAll(): void {
    this.list$.next(this.list); 
  }
  */


  create(productitem: Product): void {
    this.http.post<Product>(
      `${this.listUrl}`,
      productitem
    ).subscribe(
      () => this.getAll()
    );
  }

  update(productitem: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.listUrl}/${productitem.id}`,
      productitem
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(productitem: Product): void {
    this.http.delete<Product>(
      `${this.listUrl}/${productitem.id}`
    ).subscribe(
      () => this.getAll()
    );
  }


}
