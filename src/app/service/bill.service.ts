import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Bill } from '../model/bill';

import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private listUrl: string = "http://localhost:3000/bill";

  // bill.service.ts fileban levo adatok megjelenitesehez
  list$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  // 1.) - BehaviorSubject
  getAll(): void {
    this.http.get<Bill[]>(this.listUrl).subscribe(
      bill => this.list$.next(bill)
    );
  }

  get(id: number | string): Observable<Bill | undefined> {
    id = parseInt(('' + id), 10);
    return this.http.get<Bill>(`${this.listUrl}/${id}`);
  }


  create(item: Bill): void {
    this.http.post<Bill>(
      `${this.listUrl}`,
      item
    ).subscribe(
      () => this.getAll()
    );
  }

  update(item: Bill): Observable<Bill> {
    return this.http.patch<Bill>(
      `${this.listUrl}/${item.id}`,
      item
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(item: Bill): void {
    this.http.delete<Bill>(
      `${this.listUrl}/${item.id}`
    ).subscribe(
      () => this.getAll()
    );
  }

}
