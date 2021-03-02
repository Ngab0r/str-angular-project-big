import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList$: BehaviorSubject<Category[]> = this.categoryService.list$;

  constructor(
    private categoryService: CategoryService,
    ) {}

   ngOnInit(): void {
    this.categoryService.getAll();
  }

}
