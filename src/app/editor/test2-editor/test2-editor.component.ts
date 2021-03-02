import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../service/test.service';
//import { ConfigService } from '../../service/config.service';
import { Test } from '../../model/test';

@Component({
  selector: 'app-test2-editor',
  templateUrl: './test2-editor.component.html',
  styleUrls: ['./test2-editor.component.css']
})
export class Test2EditorComponent implements OnInit {

  //@Input() page: string = 'test';
  //a page változó megmondja, hogy melyik oldalról van szó

  page: string = 'test';
  url: string = `localhost:3000/${this.page}`;
  

  // ehelyett majd le kell kérni a json-ból egy tetszőleges objektumot
  sampleObj: any = new Test();
  //
  // export class Test {
  //   id: number = 0;
  //   zip: string = '';
  //   country: string = '';
  //   city: string = '';
  //   street: string = '';
  //   notes: string = '';
  // }

  keys: string[] = Object.keys(this.sampleObj);
  
  htmlInputAttributes: any = 
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
    [
    { key: 'id', text: 'Id', editable: false, inputType: 'text', pattern: '[0-9]{1,100}', errormsg: 'számokból álljon (legfeljebb 100)!' },
    { key: 'zip', text: 'Zip', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'country', text: 'Country', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'city', text: 'City', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'street', text: 'Street', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'notes', text: 'Notes', editable: true, inputType: 'text', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' },
    { key: 'active', text: 'Active', editable: true, inputType: 'checkbox', pattern: '.{2,100}', errormsg: 'minimum 2 maximum 100 karakter legyen!' }
    ];

  // Ez egyelőre nem kell
  //
  // async importFile(filename:string):Promise<any>{
  //   console.log('importing ',filename);
  //   const importedFile = await import(filename);
  //   console.log("\t imported ...");
  //   return importedFile;
  // }
  // module:any = this.importFile(`../model/${this.page}`);

  editedItemType: Test = new Test();
  updating: boolean = false;

  constructor(
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.testService.get(params.idOrName).subscribe(
          testitem => {
            console.log(testitem);
            this.editedItemType = testitem || new Test();
          }
        )
    );
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;

    if (this.editedItemType.id === null || this.editedItemType.id === 0) {
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

}
