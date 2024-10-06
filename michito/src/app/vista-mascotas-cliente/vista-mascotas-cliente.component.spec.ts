import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMascotasClienteComponent } from './vista-mascotas-cliente.component';

describe('VistaMascotasClienteComponent', () => {
  let component: VistaMascotasClienteComponent;
  let fixture: ComponentFixture<VistaMascotasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaMascotasClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaMascotasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
