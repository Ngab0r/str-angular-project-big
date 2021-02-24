import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../model/category';

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
}
