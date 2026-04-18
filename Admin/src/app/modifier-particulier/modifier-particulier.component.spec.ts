import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierParticulierComponent } from './modifier-particulier.component';

describe('ModifierParticulierComponent', () => {
  let component: ModifierParticulierComponent;
  let fixture: ComponentFixture<ModifierParticulierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierParticulierComponent]
    });
    fixture = TestBed.createComponent(ModifierParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
