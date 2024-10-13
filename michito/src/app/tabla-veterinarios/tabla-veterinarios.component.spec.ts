import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaVeterinariosComponent } from './tabla-veterinarios.component';

describe('TablaVeterinariosComponent', () => {
  let component: TablaVeterinariosComponent;
  let fixture: ComponentFixture<TablaVeterinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaVeterinariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaVeterinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
