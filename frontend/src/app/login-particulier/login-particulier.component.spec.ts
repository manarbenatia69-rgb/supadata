import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginParticulierComponent } from './login-particulier.component';

describe('LoginParticulierComponent', () => {
  let component: LoginParticulierComponent;
  let fixture: ComponentFixture<LoginParticulierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginParticulierComponent]
    });
    fixture = TestBed.createComponent(LoginParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
