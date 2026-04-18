import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEmployerComponent } from './ajouter-employer.component';

describe('AjouterEmployerComponent', () => {
  let component: AjouterEmployerComponent;
  let fixture: ComponentFixture<AjouterEmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterEmployerComponent]
    });
    fixture = TestBed.createComponent(AjouterEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
