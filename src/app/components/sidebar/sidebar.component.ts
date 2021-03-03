import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  //{ path: '/testeditor/:idOrName', title: 'Edit', icon: 'dashboard', class: '' },
  // { path: '/test', title: 'Testing', icon: 'dashboard', class: '' },
  // { path: '/test', title: 'Testing', icon: 'dashboard', class: '' },
  { path: '/category', title: 'Category', icon: 'category', class: '' },
  { path: '/product', title: 'ProductList', icon: 'music_note', class: '' },
  { path: '/order', title: 'OrderList', icon: 'shopping_cart', class: '' },
  { path: '/customer', title: 'CustomertList', icon: 'account_circle', class: '' },
  { path: '/bill', title: 'BillList', icon: 'request_page', class: '' },
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  //   { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  //   { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  //   { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  //   { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  //   { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  //   { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  //   { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
