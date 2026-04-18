import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordParticulierComponent } from './dashbord-particulier.component';

describe('DashbordParticulierComponent', () => {
  let component: DashbordParticulierComponent;
  let fixture: ComponentFixture<DashbordParticulierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordParticulierComponent]
    });
    fixture = TestBed.createComponent(DashbordParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
