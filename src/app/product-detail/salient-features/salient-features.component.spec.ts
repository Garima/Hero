import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalientFeaturesComponent } from './salient-features.component';

describe('SalientFeaturesComponent', () => {
  let component: SalientFeaturesComponent;
  let fixture: ComponentFixture<SalientFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalientFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalientFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
