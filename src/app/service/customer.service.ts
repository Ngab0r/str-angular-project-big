import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'app/model/customer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


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

    get(id: number | string): Observable<Customer | undefined> {
    id = parseInt(('' + id), 10);
    return this.http.get<Customer>(`${this.listUrl}/${id}`);
  }


create(item: Customer): void {
    this.http.post<Customer>(
      `${this.listUrl}`,
      item
    ).subscribe(
      () => this.getAll()
    );
  }

  update(item: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.listUrl}/${item.id}`,
      item
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(item: Customer): void {
    this.http.delete<Customer>(
      `${this.listUrl}/${item.id}`
    ).subscribe(
      () => this.getAll()
    );
  }

}
