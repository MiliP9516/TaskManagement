import { Component } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TasknewComponent } from './tasknew/tasknew.component';
import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
export const appRoutes: Routes = [
  {
    path: '', component: SigninComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'tasklist', component: TasklistComponent
  },
  {
    path: 'tasknew', component: TasknewComponent
  },
  {
    path: 'taskupdate/:id', component: TaskupdateComponent
  }
];
