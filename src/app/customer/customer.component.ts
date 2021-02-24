import { Component, OnInit } from '@angular/core';
import { Customer } from 'app/model/customer';
import { CustomerService } from 'app/service/customer.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  // 1.) - Behaviorsubject
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;


  constructor(
    private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.customerService.getAll();
  }


}
