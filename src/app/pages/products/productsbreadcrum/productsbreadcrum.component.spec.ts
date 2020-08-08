import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsbreadcrumComponent } from './productsbreadcrum.component';

describe('ProductsbreadcrumComponent', () => {
  let component: ProductsbreadcrumComponent;
  let fixture: ComponentFixture<ProductsbreadcrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsbreadcrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsbreadcrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
