import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductSelectorComponent } from './compare-product-selector.component';

describe('CompareProductSelectorComponent', () => {
  let component: CompareProductSelectorComponent;
  let fixture: ComponentFixture<CompareProductSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareProductSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareProductSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
