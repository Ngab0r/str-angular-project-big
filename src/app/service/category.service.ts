import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../model/category';

import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private listUrl: string = "http://localhost:3000/category";

  // test.service.ts fileban levo adatok megjelenitesehez
  list$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getAll(): void {
    this.http.get<Category[]>(this.listUrl).subscribe(
      category => this.list$.next(category)
    );
  }

  get(id: number | string): Observable<Category | undefined> {
    id = parseInt(('' + id), 10);
    return this.http.get<Category>(`${this.listUrl}/${id}`);
  }


  create(item: Category): void {
    this.http.post<Category>(
      `${this.listUrl}`,
      item
    ).subscribe(
      () => this.getAll()
    );
  }

  update(item: Category): Observable<Category> {
    return this.http.patch<Category>(
      `${this.listUrl}/${item.id}`,
      item
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(item: Category): void {
    this.http.delete<Category>(
      `${this.listUrl}/${item.id}`
    ).subscribe(
      () => this.getAll()
    );
  }
}
