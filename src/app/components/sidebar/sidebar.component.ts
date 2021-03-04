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
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: 'orange' },
  { path: '/category', title: 'Categories', icon: 'category', class: 'green' },
  { path: '/product', title: 'Products', icon: 'music_note', class: 'red' },
  { path: '/order', title: 'Orders', icon: 'shopping_cart', class: 'blue' },
  { path: '/customer', title: 'Customers', icon: 'account_circle', class: 'puple' },
  { path: '/bill', title: 'Bills', icon: 'request_page', class: 'rose' },
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
