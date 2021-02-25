import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TestService } from '../../service/test.service';
import { Test } from '../../model/test';

@Component({
  selector: 'app-test-editor',
  templateUrl: './test-editor.component.html',
  styleUrls: ['./test-editor.component.css']
})
export class TestEditorComponent implements OnInit {

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
    this.testService.update(this.testtt).subscribe(
      () => this.router.navigate(['test'])
    );
  }

}
