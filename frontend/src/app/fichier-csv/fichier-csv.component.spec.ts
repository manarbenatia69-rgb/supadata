import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierCsvComponent } from './fichier-csv.component';

describe('FichierCsvComponent', () => {
  let component: FichierCsvComponent;
  let fixture: ComponentFixture<FichierCsvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichierCsvComponent]
    });
    fixture = TestBed.createComponent(FichierCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
