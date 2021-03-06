import { Injectable } from '@angular/core';

export interface IMenuItem {
  text: string;
  link: string;
  icon?: string;
}


export interface ITableCol {
  key: string;
  text: string;
  editable: boolean;
  inputType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  appName: string = 'FilmShop';

  menuItems: IMenuItem[] = [
    { text: 'Home', link: '/', icon: 'home' },
    { text: 'Action', link: '/cat01' },
    { text: 'Family', link: '/cat02' },
    { text: 'Horror', link: '/cat03' },
    { text: 'Admin', link: '/admin' },
  ];


  tableCols: ITableCol[] = [
    { key: 'image', text: 'Image', editable: true, inputType: 'text' },
    { key: 'id', text: 'Id', editable: false, inputType: 'text' },
    { key: 'name', text: 'Name', editable: true, inputType: 'text' },
    { key: 'title', text: 'Stock', editable: true, inputType: 'text' },
    { key: 'year', text: 'Active', editable: true, inputType: 'checkbox' },
    { key: 'type', text: 'Active', editable: true, inputType: 'checkbox' },
    { key: 'catID', text: 'Category Id', editable: true, inputType: 'text' },
    { key: 'description', text: 'Description', editable: true, inputType: 'text' },
    { key: 'price', text: 'Price', editable: true, inputType: 'text' },
    { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox' },
    { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox' }
  ];

  searchByProperties: string[] = ['name', 'description', 'price'];
  orderByProperties: string[] = ['name', 'description', 'price', 'featured', 'discount'];


  constructor() { }
}
