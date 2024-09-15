import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBienvenidaComponent } from './main-bienvenida.component';

describe('MainBienvenidaComponent', () => {
  let component: MainBienvenidaComponent;
  let fixture: ComponentFixture<MainBienvenidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBienvenidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
