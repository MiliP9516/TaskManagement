import { Component, OnInit } from '@angular/core';
import { IUser } from '../Model/user';
import { AuthenticationService } from '../service/authentication.service';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
  user: IUser;
  signupForm = new FormGroup({
    username : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  ngOnInit() {
  }
  get username() {
    return this.signupForm.get('username');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  onSignUpFormSubmit() {
    const user = this.signupForm.value;
    this.authService.signup(user)
    .subscribe(data => {console.log('sign up, New user'); }, (error) => {console.log(error); },
  () => {console.log(this.user); this.isLogIn(); });
  }
  public  isLogIn() {
    console.log('Successfully log in...');
   this.router.navigate(['/tasklist']);
  }
}
