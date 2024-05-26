import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginFormComponent } from './user-login-form.component';

/**
 * @file user-login-form.component.spec.ts
 * @description Unit tests for UserLoginFormComponent.
 */
describe('UserLoginFormComponent', () => {
  let component: UserLoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLoginFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
