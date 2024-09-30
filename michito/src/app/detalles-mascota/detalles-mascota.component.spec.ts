import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMascotaComponent } from './detalles-mascota.component';

describe('DetallesMascotaComponent', () => {
  let component: DetallesMascotaComponent;
  let fixture: ComponentFixture<DetallesMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
