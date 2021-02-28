import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'app/service/test.service';
//import { ConfigService } from 'app/service/config.service';
import { Test } from 'app/model/test';
import { ProductService } from 'app/service/product.service';
import { Product } from 'app/model/product';
import { CategoryService } from 'app/service/category.service';
import { Category } from 'app/model/category';
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
  
  setHtmlInputAttributes(): void{
    this.htmlInputAttributes =
    this.page === 'bill' ?
    [
    { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'id', text: 'Id', editable: false, inputType: 'text', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!' },
    { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'title', text: 'Stock', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'year', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'type', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'catID', text: 'Category Id', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'price', text: 'Price', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}' }
    ] : 
    this.page === 'category' ?
    [
    { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'id', text: 'Id', editable: false, inputType: 'text', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!' },
    { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'title', text: 'Stock', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'year', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'type', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'catID', text: 'Category Id', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'price', text: 'Price', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}' }
    ] : 
    this.page === 'customer' ?
    [
    { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'id', text: 'Id', editable: false, inputType: 'text', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!' },
    { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'title', text: 'Stock', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'year', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'type', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'catID', text: 'Category Id', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'price', text: 'Price', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}' }
    ] :
    this.page === 'product' ?
    [
    { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'id', text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!' },
    { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'title', text: 'Title', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!' },
    { key: 'year', text: 'Year', editable: true, inputType: 'number', pattern: '[0-9]{4}', errormsg: '4 darab számból álljon!' },
    { key: 'type', text: 'Type', editable: true, inputType: 'text', pattern: '.{1,100}', errormsg: 'maximum 100 karakter legyen!' },
    { key: 'catID', text: 'Category Id', editable: true, inputType: 'number', pattern: '[0-9]{1,32}', errormsg: 'maximum 32 darab számjegy legyen!' },
    { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'price', text: 'Price', editable: true, inputType: 'number', pattern: '[0-9]{1,32}', errormsg: 'maximum 32 darab számjegy legyen!' },
    { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: '' },
    { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: '' }
    ] :
    [
    { key: 'id', text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!' },
    { key: 'zip', text: 'Zip', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'country', text: 'Country', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'city', text: 'City', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'street', text: 'Street', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'notes', text: 'Notes', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'active', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' }
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

  editedItemType:any = {};
  updating: boolean = false;
  private service:any = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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
            this.editedItemType = testitem;// || this.model;
          }
        )
      });
   }

  onFormSubmit(form: NgForm): void {
    this.updating = true;

    if (this.editedItemType.id === null || this.editedItemType.id === 0) {
      this.service.create(this.editedItemType);
      console.log('router should navigate to '+ this.page);
      this.router.navigate([this.page]);
    } else {
      this.service.update(this.editedItemType).subscribe(
        () => this.router.navigate([this.page])
      );
    }
  }

  delete(): void {
    this.service.remove(this.editedItemType);
    this.router.navigate([this.page]);
  }
  
  selectService(page: string): void {
    this.page = page;
    console.log(page + 'in selectService');
    switch (page) {
      case 'product':
        this.service = this.productService;
        this.page = page;
        this.model = new Product();
        break;
      case 'category':
        this.service = this.categoryService;
        this.page = page;
        this.model = new Category();
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
