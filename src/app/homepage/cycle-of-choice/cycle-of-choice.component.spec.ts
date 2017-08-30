import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleOfChoiceComponent } from './cycle-of-choice.component';

describe('CycleOfChoiceComponent', () => {
  let component: CycleOfChoiceComponent;
  let fixture: ComponentFixture<CycleOfChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleOfChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleOfChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
