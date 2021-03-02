import { Component, OnInit } from '@angular/core';
import { Bill } from 'app/model/bill';
import { BillService } from 'app/service/bill.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  // 1.) - Behaviorsubject
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;

  // 2.) - Observable
  //addressList: Observable<Address[]>;




  constructor(
    private billService: BillService,
  ) {
    // 2.) - Observable  
    //  this.addressX = this.productService.getAll();
  }

  ngOnInit(): void {
    this.billService.getAll();
  }

}
