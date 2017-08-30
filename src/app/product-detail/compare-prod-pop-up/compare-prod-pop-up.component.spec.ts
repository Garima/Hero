import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProdPopUpComponent } from './compare-prod-pop-up.component';

describe('CompareProdPopUpComponent', () => {
  let component: CompareProdPopUpComponent;
  let fixture: ComponentFixture<CompareProdPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareProdPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareProdPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
