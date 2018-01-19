import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPremiosComponent } from './dialog-premios.component';

describe('DialogPremiosComponent', () => {
  let component: DialogPremiosComponent;
  let fixture: ComponentFixture<DialogPremiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPremiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
