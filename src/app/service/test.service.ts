import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Test } from '../model/test';

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
      address => this.list$.next(address)
    );
  }
  

  get(id: number | string): Observable<Test | undefined> {
    id = parseInt((''+ id), 10);
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


}
