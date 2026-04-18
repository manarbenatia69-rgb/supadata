import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEntrepriseComponent } from './register-entreprise.component';

describe('RegisterEntrepriseComponent', () => {
  let component: RegisterEntrepriseComponent;
  let fixture: ComponentFixture<RegisterEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterEntrepriseComponent]
    });
    fixture = TestBed.createComponent(RegisterEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
