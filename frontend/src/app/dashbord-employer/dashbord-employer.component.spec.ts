import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordEmployerComponent } from './dashbord-employer.component';

describe('DashbordEmployerComponent', () => {
  let component: DashbordEmployerComponent;
  let fixture: ComponentFixture<DashbordEmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordEmployerComponent]
    });
    fixture = TestBed.createComponent(DashbordEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
