import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTratamientosComponent } from './tabla-tratamientos.component';

describe('TablaTratamientosComponent', () => {
  let component: TablaTratamientosComponent;
  let fixture: ComponentFixture<TablaTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaTratamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
