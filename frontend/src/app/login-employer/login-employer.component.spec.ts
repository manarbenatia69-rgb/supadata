import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmployerComponent } from './login-employer.component';

describe('LoginEmployerComponent', () => {
  let component: LoginEmployerComponent;
  let fixture: ComponentFixture<LoginEmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginEmployerComponent]
    });
    fixture = TestBed.createComponent(LoginEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
