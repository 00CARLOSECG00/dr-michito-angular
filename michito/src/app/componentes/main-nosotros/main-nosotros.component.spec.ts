import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNosotrosComponent } from './main-nosotros.component';

describe('MainNosotrosComponent', () => {
  let component: MainNosotrosComponent;
  let fixture: ComponentFixture<MainNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNosotrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
