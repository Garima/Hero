import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdSimilarProductsComponent } from './prod-similar-products.component';

describe('ProdSimilarProductsComponent', () => {
  let component: ProdSimilarProductsComponent;
  let fixture: ComponentFixture<ProdSimilarProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdSimilarProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdSimilarProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
