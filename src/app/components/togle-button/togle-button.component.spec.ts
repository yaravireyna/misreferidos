import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TogleButtonComponent } from './togle-button.component';

describe('TogleButtonComponent', () => {
  let component: TogleButtonComponent;
  let fixture: ComponentFixture<TogleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TogleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TogleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
