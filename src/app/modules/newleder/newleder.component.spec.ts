import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlederComponent } from './newleder.component';

describe('NewlederComponent', () => {
  let component: NewlederComponent;
  let fixture: ComponentFixture<NewlederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
