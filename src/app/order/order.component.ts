import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order';
import { Product } from 'app/model/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  
  constructor(private orderService: OrderService,) {}

  ngOnInit(): void {
    this.orderService.getAll();
  }

}
