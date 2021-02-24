import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'app/model/customer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private listUrl: string = "http://localhost:3000/customer";

  // product.service.ts fileban levo adatok megjelenitesehez
  list$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  getAll(): void {
    this.http.get<Customer[]>(this.listUrl).subscribe(
      customer => this.list$.next(customer)
    );
  }

}
