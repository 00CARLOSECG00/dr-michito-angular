import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMascotaComponent } from './create-mascota.component';

describe('CreateMascotaComponent', () => {
  let component: CreateMascotaComponent;
  let fixture: ComponentFixture<CreateMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
