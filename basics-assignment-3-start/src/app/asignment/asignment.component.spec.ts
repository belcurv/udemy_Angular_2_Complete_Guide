import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignmentComponent } from './asignment.component';

describe('AsignmentComponent', () => {
  let component: AsignmentComponent;
  let fixture: ComponentFixture<AsignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
