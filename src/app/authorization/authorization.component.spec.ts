import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from './authorization.component';

describe('AuthorizationComponent', () => {
  let component: AuthService;
  let fixture: ComponentFixture<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
