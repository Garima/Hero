import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdSpecificationComponent } from './prod-specification.component';

describe('ProdSpecificationComponent', () => {
  let component: ProdSpecificationComponent;
  let fixture: ComponentFixture<ProdSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
