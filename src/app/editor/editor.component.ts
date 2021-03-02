import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'app/service/test.service';
//import { ConfigService } from 'app/service/config.service';
import { Test } from 'app/model/test';
import { ProductService } from 'app/service/product.service';
import { Product } from 'app/model/product';
import { BillService } from 'app/service/bill.service';
import { Bill } from 'app/model/bill';
import { CategoryService } from 'app/service/category.service';
import { Category } from 'app/model/category';
import { CustomerService } from 'app/service/customer.service';
import { Customer } from 'app/model/customer';
import { OrderService } from 'app/service/order.service';
import { Order } from 'app/model/order';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  //@Input() page: string = 'test';
  //a page változó megmondja, hogy melyik oldalról van szó

  page: string = 'test';
  url: string = `localhost:3000/${this.page}`;
  

  // ehelyett majd le kell kérni a json-ból egy tetszőleges objektumot
  //sampleObj: any = new Test();
  model: any = {};
  htmlInputAttributes: any = [];
  //
  // export class Test {
  //   id: number = 0;
  //   zip: string = '';
  //   country: string = '';
  //   city: string = '';
  //   street: string = '';
  //   notes: string = '';
  // }

  //keys: string[] = Object.keys(this.model);
  computeKey(startArray:string,longKey:string){
      const arr = longKey.split('.')[0].split('[')[0];
      const key = startArray+"['"+arr+"']"+longKey.replace(arr,'');
      console.log('editedItem(attributes.key) = ' + key);
      return(key);
  }
  
  setHtmlInputAttributes(): void{
    this.htmlInputAttributes =
    this.page === 'bill' ?
    [
    { key: 'id', subkeys:'', text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
    { key: 'orderID', subkeys:'', text: 'Order Id', editable: true, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
    { key: 'amount', subkeys:'', text: 'Amount', editable: true, inputType: 'number', pattern: '[0-9]{1,10}', errormsg: 'maximum 10 darab számjegy legyen!', isRequired: true },
    { key: 'status', subkeys:'', text: 'Status', editable: true, inputType: 'select', values: ['new','paid'], isRequired: true },
    ] : 
    this.page === 'category' ?
    [
//    { key: 'image', subkeys:'', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'id', subkeys:'', text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
    { key: 'name', subkeys:'', text: 'Name', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
    { key: 'catID', subkeys:'', text: 'Category Id', editable: true, inputType: 'number', pattern: '.{1,32}', errormsg: 'maximum 32 darab számjegy legyen!', isRequired: true },
    { key: 'description', subkeys:'', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    ] : 
    this.page === 'customer' ?
    [
//    { key: 'image', subkeys:'', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'id', subkeys:'', text: 'Customer Id', editable: false, inputType: 'text', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
    { key: 'firstName', subkeys:'', text: 'First Name', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
    { key: 'lastName', subkeys:'', text: 'Last Name', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
    { key: 'email', subkeys:'', text: 'E-mail', editable: true, inputType: 'text', pattern: '[^@]{1,32}@[0-9a-zA-Z\._-]{1,32}', errormsg: 'tartalmazza a kikac karaktert, és előtte-utána maximum 32 darab karakter legyen!', isRequired: true },
    { key: 'address', subkeys:'id', text: 'Address Id', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'address', subkeys:'zip', text: 'Zip', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'address', subkeys:'country', text: 'Country', editable: true, inputType: 'text', pattern: '.{2,25}', errormsg: 'minimum 2 maximum 25 karakter legyen!', isRequired: true },
    { key: 'address', subkeys:'city', text: 'City', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'address', subkeys:'street', text: 'Street', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'address', subkeys:'notes', text: 'Notes', editable: true, inputType: 'text', pattern: '.{0,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: false },
    { key: 'active', subkeys:'', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', isRequired: true },
  ] :
  this.page === 'product' ?
  [
    { key: 'image', subkeys:'', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'id', subkeys:'', text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
    { key: 'title', subkeys:'', text: 'Title', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
    { key: 'name', subkeys:'', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'year', subkeys:'', text: 'Year', editable: true, inputType: 'number', pattern: '[0-9]{4}', errormsg: '4 darab számból álljon!', isRequired: true },
    { key: 'type', subkeys:'', text: 'Type', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
    { key: 'catID', subkeys:'', text: 'Category Id', editable: true, inputType: 'number', pattern: '[0-9]{1,32}', errormsg: 'maximum 32 darab számjegy legyen!', isRequired: true },
    { key: 'description', subkeys:'', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'price', subkeys:'', text: 'Price', editable: true, inputType: 'number', pattern: '[0-9]{1,32}', errormsg: 'maximum 32 darab számjegy legyen!', isRequired: true },
    { key: 'featured', subkeys:'', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: '', isRequired: true },
    { key: 'active', subkeys:'', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: '', isRequired: true },
    ] :
    [
    { key: 'id', subkeys:'', text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
    { key: 'zip', subkeys:'', text: 'Zip', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'country', subkeys:'', text: 'Country', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'city', subkeys:'', text: 'City', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'street', subkeys:'', text: 'Street', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    { key: 'notes', subkeys:'', text: 'Notes', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: false },
    { key: 'active', subkeys:'', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
    ];
  }

  // Ez egyelőre nem kell
  //
  // async importFile(filename:string):Promise<any>{
  //   console.log('importing ',filename);
  //   const importedFile = await import(filename);
  //   console.log("\t imported ...");
  //   return importedFile;
  // }
  // module:any = this.importFile(`../model/${this.page}`);

  editedItem:any = {};
  updating: boolean = false;
  private service:any = false;

  constructor(
    private billService: BillService,
    private categoryService: CategoryService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.selectService(params.page);
        this.service.get(params.idOrName).subscribe(
          testitem => {
            console.log(testitem);
            this.editedItem = testitem;
          }
        )
      });
   }

  onFormSubmit(form: NgForm): void {
    this.updating = true;

    if (this.editedItem.id === null || this.editedItem.id === 0) {
      this.service.create(this.editedItem);
      console.log('router should navigate to '+ this.page);
      this.router.navigate([this.page]);
    } else {
      this.service.update(this.editedItem).subscribe(
        () => this.router.navigate([this.page])
      );
    }
  }

  delete(): void {
    this.service.remove(this.editedItem);
    this.router.navigate([this.page]);
  }
  
  selectService(page: string): void {
    this.page = page;
    console.log(page + ' in selectService');
    switch (page) {
      case 'bill':
        this.service = this.billService;
        this.page = page;
        this.model = new Bill();
        break;
      case 'category':
        this.service = this.categoryService;
        this.page = page;
        this.model = new Category();
        break;
       case 'customer':
        this.service = this.customerService;
        this.page = page;
        this.model = new Customer({});
        break;
      case 'order':
        this.service = this.orderService;
        this.page = page;
        this.model = {};
        break;
      case 'product':
        this.service = this.productService;
        this.page = page;
        this.model = new Product();
        break;
      case 'test':
        this.service = this.testService;
        this.page = page;
        this.model = new Test();
        break;
      default:
        this.service = this.testService;
        this.page = page;
        this.model = new Test();
    }
    this.setHtmlInputAttributes();
  }
}
