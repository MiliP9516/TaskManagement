import { Component, OnInit } from '@angular/core';
import { IUser } from '../Model/user';
import { AuthenticationService } from '../service/authentication.service';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errorMessage = '';
  error = false;
  user: IUser;
  signinForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.signinForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
  }
  get email() {
    return this.signinForm.get('email');
  }
  get password() {
    return this.signinForm.get('password');
  }
  onSignInFormSubmit() {
    const user = this.signinForm.value;
    this.authService.signin(user)
    .subscribe(data => {console.log(data); }, (error) => {
      this.error = true;
      if (error.status === 401) {
        this.errorMessage = 'Password is incorrect';
      }
      this.errorMessage = 'User is not found.';
    },
  () => { console.log('user'); this.isLogIn(); });
  }
  public  isLogIn() {
    console.log('Successfully log in...');
   this.router.navigate(['/tasklist']);
  }
}
