import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServiciosComponent } from './main-servicios.component';

describe('MainServiciosComponent', () => {
  let component: MainServiciosComponent;
  let fixture: ComponentFixture<MainServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
