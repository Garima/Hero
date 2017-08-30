import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdViewedProductsComponent } from './prod-viewed-products.component';

describe('ProdViewedProductsComponent', () => {
  let component: ProdViewedProductsComponent;
  let fixture: ComponentFixture<ProdViewedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdViewedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdViewedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
