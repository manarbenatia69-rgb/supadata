import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterParticulierComponent } from './ajouter-particulier.component';

describe('AjouterParticulierComponent', () => {
  let component: AjouterParticulierComponent;
  let fixture: ComponentFixture<AjouterParticulierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterParticulierComponent]
    });
    fixture = TestBed.createComponent(AjouterParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
