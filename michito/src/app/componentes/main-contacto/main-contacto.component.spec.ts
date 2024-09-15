import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContactoComponent } from './main-contacto.component';

describe('MainContactoComponent', () => {
  let component: MainContactoComponent;
  let fixture: ComponentFixture<MainContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
