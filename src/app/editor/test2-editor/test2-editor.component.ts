import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../service/test.service';
import { Test } from '../../model/test';

@Component({
  selector: 'app-test2-editor',
  templateUrl: './test2-editor.component.html',
  styleUrls: ['./test2-editor.component.css']
})
export class Test2EditorComponent implements OnInit {

  testtt: Test = new Test();
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
            this.testtt = testitem || new Test();
          }
        )
    );
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

}
