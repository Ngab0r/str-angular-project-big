import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';

import { Filter } from 'app/model/filter';
import { Sorter } from 'app/model/sorter';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FilterPipe } from '../pipe/filter.pipe';
import { SorterPipe } from 'app/pipe/sorter.pipe';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // 1.) - Behaviorsubject
  categoryList$: BehaviorSubject<Category[]> = this.categoryService.list$;
  filter: Filter = new Filter();
  sorter: Sorter = new Sorter();
  dataSource: any;

  displayedColumns = ['id', 'name', 'description', 'edit', 'delete'];
  columns: any[] = [
    {
      name: 'id',
      title: 'No.',
      footer: ''
    },
    {
      name: 'name',
      title: 'Name',
      footer: 'Total:'
    },
    {
      name: 'description',
      title: 'Description',
      footer: 0
    },
  ];
  filterPipe: FilterPipe = new FilterPipe();
  sorterPipe: SorterPipe = new SorterPipe();
  subscribeForDeleteItem: Category = new Category();
  categoryList: Category[];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.filter.selectedKeyForSearch = 'name';
    this.sorter.sortKey = 'id';
    this.categoryService.getAll();
    this.categoryList$.subscribe(list => {
      this.categoryList = list;
      this.dataSource = new MatTableDataSource(list);
      this.columns[2].footer = this.categoryList.length;
    });
  }

  subscribeForDelete(subscribeForDeleteItem: Category): void {
    this.subscribeForDeleteItem = subscribeForDeleteItem;
  }

  delete(): void {
    this.categoryService.remove(this.subscribeForDeleteItem);
    this.toastr.success('Succesfully deleted!', 'Editor message:');

  }

  changeFilter(filter: Filter): void {
    this.filter = filter;
    this.categoryList$.subscribe(list => {
      this.categoryList = this.filterPipe.transform(list, this.filter.phrase, this.filter.selectedKeyForSearch, this.filter.phrase2);
      this.dataSource = new MatTableDataSource(this.categoryList);
      this.sorting();
    });
  }

  selectColumnForSort(col: string): void {
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
    this.sorting();
  }
  sorting() {
    this.dataSource = new MatTableDataSource(this.sorterPipe.transform(this.categoryList, this.sorter.sortKey, this.sorter.sortAscend));
  }

  tableDrop(event: CdkDragDrop<string[]>) {
    this.displayedColumns = this.moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  moveItemInArray(array: any[], prev: number, curr: number) {
    if (curr >= array.length) {
      let k = curr - array.length + 1;
      while (k--) {
        array.push(undefined);
      }
    }
    array.splice(curr, 0, array.splice(prev, 1)[0]);
    return array
  }


}
