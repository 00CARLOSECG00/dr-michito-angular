import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTestimoniosComponent } from './main-testimonios.component';

describe('MainTestimoniosComponent', () => {
  let component: MainTestimoniosComponent;
  let fixture: ComponentFixture<MainTestimoniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTestimoniosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
