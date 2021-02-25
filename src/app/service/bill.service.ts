import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Bill } from '../model/bill';

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
}
