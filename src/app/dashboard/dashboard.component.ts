import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

// dashboard widged data request
import { BehaviorSubject, Observable } from 'rxjs';

import { TestService } from '../service/test.service';
import { Test } from '../model/test';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';

import { OrderService } from '../service/order.service';
import { Order } from '../model/order';

import { BillService } from '../service/bill.service';
import { Bill } from '../model/bill';

import { map, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // dashboard widged data for test
  /* testList$: BehaviorSubject<Test[]> = this.testService.list$;
  activeTest: Observable<Test[]> = this.testList$.pipe(
    map(products => products.filter(testdata => testdata.active))
  ); */

  // active prods dashboard widget data
  testList2$: BehaviorSubject<Product[]> = this.productService.list$;
  activeProds: Observable<Product[]> = this.testList2$.pipe(
    map(products => products.filter(item => item.active))
  );

  // active customers dashboard widget data
  testList3$: BehaviorSubject<Customer[]> = this.customerService.list$;
  activeCustomers: Observable<Customer[]> = this.testList3$.pipe(
    map(products => products.filter(item => item.active))
  );

  // pending orders dashboard widget data

  testList4$: BehaviorSubject<Order[]> = this.orderService.list$;
  filterValues = ["new"];
  pendingOrders: Observable<Order[]> = this.testList4$.pipe(
    map(order => order.filter(item => item.status = "new")));

  newOrders: number = 1;


  // pending bills dashboard widget data
  testList5$: BehaviorSubject<Bill[]> = this.billService.list$;
  filterValues2 = ["new"];
  pendingBills: Observable<Bill[]> = this.testList5$.pipe(
    map(bill => bill.filter(item => this.filterValues2.indexOf(item.status) > -1))
  );


  constructor(

    // dashboard widged data request
    //private testService: TestService,
    private productService: ProductService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private billService: BillService,

  ) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {

    // dashboard widged data request
    //this.testService.getAll();
    this.productService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.billService.getAll();
    this.pendingOrders.subscribe(item => {
      this.newOrders = item.length;
      this.crateCharts();
    });


    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
  }

  crateCharts() {



    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [this.newOrders, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
}



