import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test2EditorComponent } from './test2-editor.component';

describe('Test2EditorComponent', () => {
  let component: Test2EditorComponent;
  let fixture: ComponentFixture<Test2EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test2EditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Test2EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
