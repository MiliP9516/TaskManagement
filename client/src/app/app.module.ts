import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { AuthenticationService } from './service/authentication.service';
import { TaskService } from './service/task.service';
import { TasknewComponent } from './tasknew/tasknew.component';
import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { appRoutes } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    TasklistComponent,
    TasknewComponent,
    TaskupdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthenticationService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
