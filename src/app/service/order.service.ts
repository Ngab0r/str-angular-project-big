import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private listUrl: string = "http://localhost:3000/order";

  // product.service.ts fileban levo adatok megjelenitesehez
  list$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getAll(): void {
    this.http.get<Order[]>(this.listUrl).subscribe(
      order => this.list$.next(order)
    );
  }
}
