import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentrepriseComponent } from './list-rentreprise.component';

describe('ListRentrepriseComponent', () => {
  let component: ListRentrepriseComponent;
  let fixture: ComponentFixture<ListRentrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRentrepriseComponent]
    });
    fixture = TestBed.createComponent(ListRentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
