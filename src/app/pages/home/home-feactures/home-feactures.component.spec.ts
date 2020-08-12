import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeacturesComponent } from './home-feactures.component';

describe('HomeFeacturesComponent', () => {
  let component: HomeFeacturesComponent;
  let fixture: ComponentFixture<HomeFeacturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFeacturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
