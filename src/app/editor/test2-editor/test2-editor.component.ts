import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../service/test.service';
//import { ConfigService } from '../../service/config.service';
import { Test } from '../../model/test';
import { TableCol } from 'app/model/table-col';
import { ProductService } from 'app/service/product.service';
import { Product } from 'app/model/product';
import { CategoryService } from 'app/service/category.service';
import { Category } from 'app/model/category';

@Component({
  selector: 'app-test2-editor',
  templateUrl: './test2-editor.component.html',
  styleUrls: ['./test2-editor.component.css']
})
export class Test2EditorComponent implements OnInit {

  //@Input() page: string = 'test';
  //a page változó megmondja, hogy melyik oldalról van szó

  page: string = 'test';
  // url: string = `localhost:3000/${this.page}`;


  // // ehelyett majd le kell kérni a json-ból egy tetszőleges objektumot
  // // sampleObj: any = new Test();
  // //
  // // export class Test {
  // //   id: number = 0;
  // //   zip: string = '';
  // //   country: string = '';
  // //   city: string = '';
  // //   street: string = '';
  // //   notes: string = '';
  // // }

  // // keys: string[] = Object.keys(this.sampleObj);

  htmlInputAttributes: any;


  // Ez egyelőre nem kell
  //
  // async importFile(filename:string):Promise<any>{
  //   console.log('importing ',filename);
  //   const importedFile = await import(filename);
  //   console.log("\t imported ...");
  //   return importedFile;
  // }
  // module:any = this.importFile(`../model/${this.page}`);

  editedItemType: any = new Test();
  updating: boolean = false;
  // tableCols = new TableCol();

  private model: any;
  private testService: any;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private testServiceService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params.key);
        this.selectService(params.key);
        this.testService.get(params.idOrName).subscribe(
          testitem => {
            console.log(testitem);
            this.editedItemType = testitem || this.model;
          }
        )
      });
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;

    if (this.editedItemType.id === null) {
      this.testService.create(this.editedItemType);
      this.router.navigate([this.page]);
    } else {
      this.testService.update(this.editedItemType).subscribe(
        () => this.router.navigate([this.page])
      );
    }
  }

  delete(): void {
    this.testService.remove(this.editedItemType);
    this.router.navigate([this.page]);
  }

  selectService(paramKey: string): void {
    console.log(paramKey);
    switch (paramKey) {
      case 'product':
        this.testService = this.productService;
        this.page = paramKey;
        this.model = new Product();
        break;

      case 'category':
        this.testService = this.categoryService;
        this.page = paramKey;
        this.model = new Category();
        break;
      case 'test':
        this.testService = this.testServiceService;
        this.page = paramKey;
        this.model = new Test();
        break;

    }
    this.htmlInputAttributes =
      this.page === 'bill' ?
        [
          { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'id', text: 'Id', editable: false, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'title', text: 'Stock', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'year', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'type', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'catID', text: 'Category Id', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'price', text: 'Price', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
          { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}', isRequired: true }
        ] :
        this.page === 'category' ?
          [
            { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'id', text: 'Id', editable: false, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'title', text: 'Stock', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'year', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'type', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'catID', text: 'Category Id', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'price', text: 'Price', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
            { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}', isRequired: true }
          ] :
          this.page === 'customer' ?
            [
              { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'id', text: 'Id', editable: false, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'title', text: 'Stock', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'year', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'type', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'catID', text: 'Category Id', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'price', text: 'Price', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
              { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '.{2,100}', isRequired: true }
            ] :
            this.page === 'product' ?
              [
                { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '', errormsg: '', isRequired: true },
                { key: 'id', text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{0,4}', errormsg: '  Az id minimum 0 maximum 4 karakter legyen!', isRequired: true },
                { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,30}', errormsg: 'Az name minimum 2 maximum 30 karakter legyen!', isRequired: true },
                { key: 'title', text: 'Title', editable: true, inputType: 'text', pattern: '.{2,20}', errormsg: 'A title minimum 2 maximum 20 karakter legyen!', isRequired: true },
                { key: 'year', text: 'Year', editable: true, inputType: 'number', pattern: '[0-9]{4}', errormsg: '   A year 4 karakter legyen!', isRequired: true },
                { key: 'type', text: 'Type', editable: true, inputType: 'text', pattern: '.{1,20}', errormsg: 'A type minimum 1 maximum 20 karakter legyen!', isRequired: true },
                { key: 'catID', text: 'Category Id', editable: true, inputType: 'text', pattern: '[0-9]{1,10}', errormsg: 'A catID minimum 1 maximum 10 karakter legyen!', isRequired: true },
                { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{1,50}', errormsg: 'A description minimum 1 maximum 50 karakter legyen!', isRequired: true },
                { key: 'price', text: 'Price', editable: true, inputType: 'number', pattern: '[0-9]+', errormsg: 'A price minimum 1 karakter legyen!', isRequired: true },
                { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '', errormsg: '', isRequired: false },
                { key: 'active', text: 'Active', editable: true, inputType: 'checkbox', pattern: '', errormsg: '', isRequired: false }
              ] :
              [
                { key: 'id', text: 'Id', editable: false, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: 'zip', text: 'Zip', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: 'country', text: 'Country', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: 'city', text: 'City', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: 'street', text: 'Street', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: 'notes', text: 'Notes', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true },
                { key: 'active', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!', isRequired: true }
              ];
  }

}
