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
import { ToastrService } from 'ngx-toastr';

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
  
  
  // what it does (example):
  // computeKey(customer,'address.zip');
  // returns customer['address']['zip']
  // the variable itself,
  // NOT "customer['address']['zip']", the variable name in a string
  // so we do not need eval()
  //
  computeKey(startObj: any, longKey: string) {
    if(longKey === '') return startObj;
  //  console.log(longKey);
    const firstKey = longKey.split('.')[0].split('[')[0];
    let restKeys = longKey.replace(firstKey, '');
    if(restKeys ===''){
        try{return startObj[longKey]}
        catch(err){
            console.log(err);
            console.log(`${startObj} does not have property ${longKey}`);
        }
    }
    restKeys = restKeys.charAt(0) === '.' ? restKeys.substring(1) : restKeys.substring(1).replace(']','');
    return this.computeKey(startObj[firstKey],restKeys);
  }
  
  // key contains the VALUE of variable to be set (we cannot pass a reference in JS).
  // That is, key is a copy of the variable. 
  // If key updates, the variable will not update.
  // Hence in keyname we store the NAME of the variable in a string.
  // On submitting (in 'onFormSubmit') we set the variable in keyname to the (updated) value in key.
  setHtmlInputAttributes(): void {
    if (this.page === 'order') {
      this.htmlInputAttributes =
        [
          { key: this.editedItem['id'], keyname: "this.editedItem['id']", text: 'Image', editable: true, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
          { key: this.editedItem['customerID'], keyname: "this.editedItem['customerID']", text: 'Customer Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true }];

      for (let i = 0; i < this.editedItem['items'].length; i++) {
        this.htmlInputAttributes.push({ key: this.editedItem['items'][i]['productID'], keyname: "this.editedItem['items'][" + i + "]['productID']", text: `Product ID ${i + 1}`, editable: true, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true });
        this.htmlInputAttributes.push({ key: this.editedItem['items'][i]['quantity'], keyname: "this.editedItem['items'][" + i + "]['quantity']", text: `Quantity ${i + 1}`, editable: true, inputType: 'number', pattern: '[0-9]{1,10}', errormsg: 'maximum 10 darab számjegy legyen!', isRequired: true });
      }
      this.htmlInputAttributes.push({ key: this.editedItem['amount'], keyname: "this.editedItem['amount']", text: 'Amount', editable: true, inputType: 'number', pattern: '[0-9]{1,10}', errormsg: 'maximum 10 darab számjegy legyen!', isRequired: true });
      this.htmlInputAttributes.push({ key: this.editedItem['status'], keyname: "this.editedItem['status']", text: 'Status', editable: true, inputType: 'select', values: ['new', 'shipped', 'paid'], isRequired: true });
    }
    else this.htmlInputAttributes =
      this.page === 'bill' ?
        [
          { key: this.editedItem['id'], keyname: "this.editedItem['id']", text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
          { key: this.editedItem['orderID'], keyname: "this.editedItem['orderID']", text: 'Order Id', editable: true, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
          { key: this.editedItem['amount'], keyname: "this.editedItem['amount']", text: 'Amount', editable: true, inputType: 'number', pattern: '[0-9]{1,10}', errormsg: 'maximum 10 darab számjegy legyen!', isRequired: true },
          { key: this.editedItem['status'], keyname: "this.editedItem['status']", text: 'Status', editable: true, inputType: 'select', values: ['new', 'paid'], isRequired: true },
        ] :
        this.page === 'category' ?
          [
            //    { key: this.editedItem['image'], keyname: "this.editedItem['image']", text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            //    { key: this.editedItem['id'], keyname: "this.editedItem['id']", text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
            { key: this.editedItem['id'], keyname: "this.editedItem['id']", text: 'Category Id', editable: true, inputType: 'number', pattern: '.{1,32}', errormsg: 'maximum 32 darab számjegy legyen!', isRequired: true },
            { key: this.editedItem['name'], keyname: "this.editedItem['name']", text: 'Name', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
            { key: this.editedItem['description'], keyname: "this.editedItem['description']", text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          ] :
          this.page === 'customer' ?
            [
              //    { key: this.editedItem['image'], keyname: "this.editedItem['image']", text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: this.editedItem['id'], keyname: "this.editedItem['id']", text: 'Customer Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
              { key: this.editedItem['firstName'], keyname: "this.editedItem['firstName']", text: 'First Name', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
              { key: this.editedItem['lastName'], keyname: "this.editedItem['lastName']", text: 'Last Name', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
              { key: this.editedItem['email'], keyname: "this.editedItem['email']", text: 'E-mail', editable: true, inputType: 'text', pattern: '[^@]{1,32}@[0-9a-zA-Z\._-]{1,32}', errormsg: 'tartalmazza a kikac karaktert, és előtte-utána maximum 32 darab karakter legyen!', isRequired: true },
              //    { key: this.editedItem['address'], keyname: "this.editedItem['address']", text: 'Address Id', editable: true, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
              { key: this.editedItem['address']['zip'], keyname: "this.editedItem['address']['zip']", text: 'Zip', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: this.editedItem['address']['country'], keyname: "this.editedItem['address']['country']", text: 'Country', editable: true, inputType: 'text', pattern: '.{2,25}', errormsg: 'minimum 2 maximum 25 karakter legyen!', isRequired: true },
              { key: this.editedItem['address']['city'], keyname: "this.editedItem['address']['city']", text: 'City', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: this.editedItem['address']['street'], keyname: "this.editedItem['address']['street']", text: 'Street', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: this.editedItem['address']['notes'], keyname: "this.editedItem['address']['notes']", text: 'Notes', editable: true, inputType: 'text', pattern: '.{0,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: false },
              { key: this.editedItem['active'], keyname: "this.editedItem['active']", text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', isRequired: true },
            ] :
            this.page === 'product' ?
              [
                { key: this.editedItem['image'], keyname: "this.editedItem['image']", text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['id'], keyname: "this.editedItem['id']", text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
                { key: this.editedItem['title'], keyname: "this.editedItem['title']", text: 'Title', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['name'], keyname: "this.editedItem['name']", text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['year'], keyname: "this.editedItem['year']", text: 'Year', editable: true, inputType: 'number', pattern: '[0-9]{4}', errormsg: '4 darab számból álljon!', isRequired: true },
                { key: this.editedItem['type'], keyname: "this.editedItem['type']", text: 'Type', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['catID'], keyname: "this.editedItem['catID']", text: 'Category Id', editable: true, inputType: 'number', pattern: '[0-9]{1,32}', errormsg: 'maximum 32 darab számjegy legyen!', isRequired: true },
                { key: this.editedItem['description'], keyname: "this.editedItem['description']", text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['price'], keyname: "this.editedItem['price']", text: 'Price', editable: true, inputType: 'number', pattern: '[0-9]{1,32}', errormsg: 'maximum 32 darab számjegy legyen!', isRequired: true },
                { key: this.editedItem['featured'], keyname: "this.editedItem['featured']", text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: '', isRequired: true },
                { key: this.editedItem['active'], keyname: "this.editedItem['active']", text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: '', isRequired: true },
              ] :
              [
                { key: this.editedItem['id'], keyname: "this.editedItem['id']", text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!', isRequired: true },
                { key: this.editedItem['zip'], keyname: "this.editedItem['zip']", text: 'Zip', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['country'], keyname: "this.editedItem['country']", text: 'Country', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['city'], keyname: "this.editedItem['city']", text: 'City', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['street'], keyname: "this.editedItem['street']", text: 'Street', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: this.editedItem['notes'], keyname: "this.editedItem['notes']", text: 'Notes', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: false },
                { key: this.editedItem['active'], keyname: "this.editedItem['active']", text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
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

  editedItem: any = {};
  updating: boolean = false;
  private service: any = false;

  constructor(
    private billService: BillService,
    private categoryService: CategoryService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.selectService(params.page);
        this.service.get(params.idOrName).subscribe(
          testitem => {
            console.log(testitem);
            this.editedItem = testitem;
            this.setHtmlInputAttributes();
            //             let i;
            //             for(i of this.htmlInputAttributes){
            //               console.log(i.key);
            //             }
          }
        )
      });
  }

  onFormSubmit(form: NgForm): void {
    if (!form.valid) {
      this.toastr.error('Invalid form!', 'Editor message:');
      return;
    }
    this.updating = true;
    let attributes;
    for (attributes of this.htmlInputAttributes) {
      eval(attributes.keyname + "= attributes.key");
      console.log('setting ' + attributes.keyname + ' to ' + attributes.key);
    }
    if (this.editedItem.id === null || this.editedItem.id === 0) {
      this.service.create(this.editedItem);
      console.log('router should navigate to ' + this.page);
      this.router.navigate([this.page]);
      this.toastr.success('Succesfully created!', 'Editor message:');

    } else {
      this.service.update(this.editedItem).subscribe(
        () => {
          this.router.navigate([this.page]);
          this.toastr.success('Succesfully saved!', 'Editor message:');
        }
      );
    }
  }

  delete(): void {
    this.service.remove(this.editedItem);
    this.router.navigate([this.page]);
    this.toastr.success('Succesfully deleted!', 'Editor message:');

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
  }
}
