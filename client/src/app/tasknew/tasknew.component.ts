import { Component, OnInit } from '@angular/core';
import { ITask } from '../Model/task';
import { TaskService } from '../service/task.service';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-tasknew',
  templateUrl: './tasknew.component.html',
  styleUrls: ['./tasknew.component.css']
})
export class TasknewComponent implements OnInit {
  task: ITask;
  tasks: ITask[];
  alert = false;
  alertMessage = '';
  constructor(private taskService: TaskService,  private router: Router, private route: ActivatedRoute) { }
  tasknewForm = new FormGroup({
    allocatedby : new FormControl(''),
    allocateto : new FormControl(''),
    taskname : new FormControl(''),
    taskdesc : new FormControl(''),
    planneddate : new FormControl(''),
    duration : new FormControl(''),
    status: new FormControl('')
  });
  ngOnInit() {
  }
  onTaskNewFormSubmit() {
    const task = this.tasknewForm.value;
    this.taskService.tasknew(task)
    .subscribe(data => {this.task = data; }, (error) => {
      if (error.status === 500) {
        this.router.navigate(['/']);
      } else {console.log(error); }
     },
  () => { this.alert = true; this.alertMessage = 'New task is created';
    console.log(this.task); });
  }
  back() {
    this.router.navigate(['/tasklist']);
  }
  logout() {
    this.taskService.logout();
    this.router.navigate(['/']);
  }
}
