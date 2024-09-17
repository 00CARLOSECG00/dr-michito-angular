import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGeneralComponent } from './crud-general.component';

describe('CrudGeneralComponent', () => {
  let component: CrudGeneralComponent;
  let fixture: ComponentFixture<CrudGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
