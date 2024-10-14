import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVeterinarioComponent } from './create-veterinario.component';

describe('CreateVeterinarioComponent', () => {
  let component: CreateVeterinarioComponent;
  let fixture: ComponentFixture<CreateVeterinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVeterinarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
