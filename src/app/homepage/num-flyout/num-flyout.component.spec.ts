import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumFlyoutComponent } from './num-flyout.component';

describe('NumFlyoutComponent', () => {
  let component: NumFlyoutComponent;
  let fixture: ComponentFixture<NumFlyoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumFlyoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
