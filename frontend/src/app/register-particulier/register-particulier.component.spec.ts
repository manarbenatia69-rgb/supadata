import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterParticulierComponent } from './register-particulier.component';

describe('RegisterParticulierComponent', () => {
  let component: RegisterParticulierComponent;
  let fixture: ComponentFixture<RegisterParticulierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterParticulierComponent]
    });
    fixture = TestBed.createComponent(RegisterParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
