import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Test } from '../model/test';

import { map, tap } from 'rxjs/operators';

import { filter, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  /* list: Test[] = [
      {
        id: 9,
        zip: "123",
        country: "music",
        city: "12",
        street: "xzy",
        notes: "432xxxxxxxxxxxx",
      },
    ]; */


  private listUrl: string = "http://localhost:3000/testdata";

  // test.service.ts fileban levo adatok megjelenitesehez
  list$: BehaviorSubject<Test[]> = new BehaviorSubject<Test[]>([]);
    

  constructor(
    private http: HttpClient
  ) { }


  // 1.) - BehaviorSubject
  getAll(): void {
    this.http.get<Test[]>(this.listUrl).subscribe(
      testitem => this.list$.next(testitem)
    );
  }
  // ha ts fileban van a json adat
  /* getAll(): void {
    this.list$.next([]);
    this.http.get<Test]>(this.apiUrl).subscribe(
      testitems => this.list$.next(testitems)
    );
  } */


  get(id: number | string): Observable<Test | undefined> {
    id = parseInt(('' + id), 10);
    return this.http.get<Test>(`${this.listUrl}/${id}`);
  }


  //2.) - Observable
  /* getAll(): Observable<Test[]> {
    return this.http.get<Test[]>(this.listUrl);
  } */



  // 3.) - test.service.ts fileban levo adatok megjelenitesehez
  /* 
  getAll(): void {
    this.list$.next(this.list); 
  }
  */


  create(testitem: Test): void {
    this.http.post<Test>(
      `${this.listUrl}`,
      testitem
    ).subscribe(
      () => this.getAll()
    );
  }

  update(testitem: Test): Observable<Test> {
    return this.http.patch<Test>(
      `${this.listUrl}/${testitem.id}`,
      testitem
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(testitem: Test): void {
    this.http.delete<Test>(
      `${this.listUrl}/${testitem.id}`
    ).subscribe(
      () => this.getAll()
    );
  }

}
