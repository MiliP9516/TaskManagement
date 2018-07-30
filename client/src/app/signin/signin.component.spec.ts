import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ SigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
   it('should create form with 2 controls', () => {
    expect(component.signinForm.contains('email')).toBeTruthy();
    expect(component.signinForm.contains('password')).toBeTruthy();
  }); */

  it('form invalid when empty', () => {
    expect(component.signinForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    const email = component.signinForm.get('email');
    expect(email.valid).toBeFalsy();

    // Set Email
    email.setValue('test@email.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    const password = component.signinForm.get('password');
    expect(password.valid).toBeTruthy();

    // Set Password
    password.setValue('test123');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a form get a user', () => {
    expect(component.signinForm.valid).toBeFalsy();
    component.signinForm.controls['email'].setValue('test@email.com');
    component.signinForm.contains['password'].setValue('test123');
    expect(component.signinForm.valid).toBeTruthy();

    // Trigger the onSignInFormSubmit function
    component.onSignInFormSubmit();

    const user = this.signinForm.value;
    expect(user.email).toBe('test@email.com');
    expect(user.password).toBe('test123');
  });
});
