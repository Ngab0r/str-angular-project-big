import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../model/order';

import { map, tap } from 'rxjs/operators';

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

    get(id: number | string): Observable<Order | undefined> {
    id = parseInt(('' + id), 10);
    return this.http.get<Order>(`${this.listUrl}/${id}`);
  }


create(item: Order): void {
    this.http.post<Order>(
      `${this.listUrl}`,
      item
    ).subscribe(
      () => this.getAll()
    );
  }

  update(item: Order): Observable<Order> {
    return this.http.patch<Order>(
      `${this.listUrl}/${item.id}`,
      item
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(item: Order): void {
    this.http.delete<Order>(
      `${this.listUrl}/${item.id}`
    ).subscribe(
      () => this.getAll()
    );
  }
}
