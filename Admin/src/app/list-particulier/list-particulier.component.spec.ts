import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParticulierComponent } from './list-particulier.component';

describe('ListParticulierComponent', () => {
  let component: ListParticulierComponent;
  let fixture: ComponentFixture<ListParticulierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListParticulierComponent]
    });
    fixture = TestBed.createComponent(ListParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
