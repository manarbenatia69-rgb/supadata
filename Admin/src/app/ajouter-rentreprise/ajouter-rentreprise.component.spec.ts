import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRentrepriseComponent } from './ajouter-rentreprise.component';

describe('AjouterRentrepriseComponent', () => {
  let component: AjouterRentrepriseComponent;
  let fixture: ComponentFixture<AjouterRentrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterRentrepriseComponent]
    });
    fixture = TestBed.createComponent(AjouterRentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
