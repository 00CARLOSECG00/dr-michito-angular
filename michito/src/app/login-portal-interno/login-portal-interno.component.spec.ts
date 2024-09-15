import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPortalInternoComponent } from './login-portal-interno.component';

describe('LoginPortalInternoComponent', () => {
  let component: LoginPortalInternoComponent;
  let fixture: ComponentFixture<LoginPortalInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPortalInternoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPortalInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
