import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../service/test.service';
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

  testtt: Product = new Product();
  updating: boolean = false;

  testCols: TableCol[] = [
    { key: 'image', text: 'Image', editable: true, inputType: 'text', pattern: '', validateMessage: '' },
    { key: 'id', text: 'Id', editable: false, inputType: 'number', pattern: '[0-9]{0,4}', validateMessage: '  Az id minimum 0 maximum 4 karakter legyen!' },
    { key: 'name', text: 'Name', editable: true, inputType: 'text', pattern: '.{2,30}', validateMessage: 'Az name minimum 2 maximum 30 karakter legyen!' },
    { key: 'title', text: 'Title', editable: true, inputType: 'text', pattern: '.{2,20}', validateMessage: 'A title minimum 2 maximum 20 karakter legyen!' },
    { key: 'year', text: 'Year', editable: true, inputType: 'number', pattern: '[0-9]{4}', validateMessage: '   A year 4 karakter legyen!' },
    { key: 'type', text: 'Type', editable: true, inputType: 'text', pattern: '.{1,20}', validateMessage: 'A type minimum 1 maximum 20 karakter legyen!' },
    { key: 'catID', text: 'Category Id', editable: true, inputType: 'text', pattern: '[0-9]{1,10}', validateMessage: 'A catID minimum 1 maximum 10 karakter legyen!' },
    { key: 'description', text: 'Description', editable: true, inputType: 'text', pattern: '.{1,50}', validateMessage: 'A description minimum 1 maximum 50 karakter legyen!' },
    { key: 'price', text: 'Price', editable: true, inputType: 'number', pattern: '[0-9]+', validateMessage: 'A price minimum 1 karakter legyen!' },
    { key: 'featured', text: 'Featured', editable: true, inputType: 'checkbox', pattern: '', validateMessage: '' },
    { key: 'active', text: 'Discount', editable: true, inputType: 'checkbox', pattern: '', validateMessage: '' }
  ];

  private model: any;
  private testService: any;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.selectService(params.key);
        this.testService.get(params.idOrName).subscribe(
          testitem => {
            console.log(testitem);
            this.testtt = testitem || new Product();
          }
        )
      });
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;

    if (this.testtt.id === null) {
      this.testService.create(this.testtt);
      this.router.navigate(['test']);
    } else {
      this.testService.update(this.testtt).subscribe(
        () => this.router.navigate(['test'])
      );
    }
  }

  delete(): void {
    this.testService.remove(this.testtt);
    this.router.navigate(['test']);
  }

  selectService(paramKey: string): void {
    console.log(paramKey);
    switch (paramKey) {
      case 'product':
        this.testService = this.productService;
        this.model = new Product();
        break;

      case 'category':
        this.testService = CategoryService;
        this.model = new Category();
        break;

    }
  }

}
