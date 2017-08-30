import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatLevel1MainComponent } from './cat-level1-main.component';

describe('CatLevel1MainComponent', () => {
  let component: CatLevel1MainComponent;
  let fixture: ComponentFixture<CatLevel1MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatLevel1MainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatLevel1MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
