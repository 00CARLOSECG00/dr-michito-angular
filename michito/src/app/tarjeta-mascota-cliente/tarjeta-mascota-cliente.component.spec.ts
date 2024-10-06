import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaMascotaClienteComponent } from './tarjeta-mascota-cliente.component';

describe('TarjetaMascotaClienteComponent', () => {
  let component: TarjetaMascotaClienteComponent;
  let fixture: ComponentFixture<TarjetaMascotaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaMascotaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaMascotaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
