import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMedicamentosComponent } from './tabla-medicamentos.component';

describe('TablaMedicamentosComponent', () => {
  let component: TablaMedicamentosComponent;
  let fixture: ComponentFixture<TablaMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaMedicamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
