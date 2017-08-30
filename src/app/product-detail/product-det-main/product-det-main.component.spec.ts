import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetMainComponent } from './product-det-main.component';

describe('ProductDetMainComponent', () => {
  let component: ProductDetMainComponent;
  let fixture: ComponentFixture<ProductDetMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
