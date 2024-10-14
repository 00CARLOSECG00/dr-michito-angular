import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicamentoComponent } from './update-medicamento.component';

describe('UpdateMedicamentoComponent', () => {
  let component: UpdateMedicamentoComponent;
  let fixture: ComponentFixture<UpdateMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMedicamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
