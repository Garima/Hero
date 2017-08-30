import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCarouselComponent } from './page-carousel.component';

describe('PageCarouselComponent', () => {
  let component: PageCarouselComponent;
  let fixture: ComponentFixture<PageCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
