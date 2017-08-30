import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMainComponent } from './brand-main.component';

describe('BrandMainComponent', () => {
  let component: BrandMainComponent;
  let fixture: ComponentFixture<BrandMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
