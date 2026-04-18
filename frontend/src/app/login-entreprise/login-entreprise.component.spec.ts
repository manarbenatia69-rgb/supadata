import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEntrepriseComponent } from './login-entreprise.component';

describe('LoginEntrepriseComponent', () => {
  let component: LoginEntrepriseComponent;
  let fixture: ComponentFixture<LoginEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginEntrepriseComponent]
    });
    fixture = TestBed.createComponent(LoginEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
