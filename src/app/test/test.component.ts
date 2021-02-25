import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { TestService } from '../service/test.service';
import { Test } from '../model/test';

import { tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // 1.) - Behaviorsubject
  testList$: BehaviorSubject<Test[]> = this.testService.list$;
  
  // 2.) - Observable
  //testList: Observable<Test[]>;

  constructor(
    private testService: TestService,
    ) {
    // 2.) - Observable  
    //  this.testList = this.testService.getAll();
   }

  ngOnInit(): void {
    this.testService.getAll();
  }

}
