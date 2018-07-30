import { Component, OnInit } from '@angular/core';
import { ITask } from '../Model/task';
import { TaskService } from '../service/task.service';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Routes, RouterModule, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-taskupdate',
  templateUrl: './taskupdate.component.html',
  styleUrls: ['./taskupdate.component.css']
})
export class TaskupdateComponent implements OnInit {
  task: ITask;
  tasks: ITask[];
  alert = false;
  alertMessage = '';
  constructor(private taskService: TaskService,  private router: Router, private route: ActivatedRoute) { }
  taskupdateForm = new FormGroup({
    _id: new FormControl(''),
    allocatedby : new FormControl(''),
    allocateto : new FormControl(''),
    taskname : new FormControl(''),
    taskdesc : new FormControl(''),
    planneddate : new FormControl(''),
    duration : new FormControl(''),
    status: new FormControl('')
  });
  _id: string;

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.taskService.taskbyid(this._id)
    .subscribe(task => {
      this.taskupdateForm.setValue({
        // tslint:disable-next-line:max-line-length
        _id: task._id, allocatedby: task.allocatedby, allocateto: task.allocateto, taskname: task.taskname, taskdesc: task.taskdesc, planneddate: task.planneddate, duration: task.duration, status: task.status
        });
    },  (error) => {
      if (error.status === 500) {
        this.router.navigate(['/']);
      } else {console.log(error); }
     }, () => {console.log(this.task); });
  }
  isUpdateNew() {
    const task = this.taskupdateForm.value;
    this.taskService.taskupdate(task)
    .subscribe(data => {this.task = data; }, (error) => {console.log(error); },
  () => { this.alert = true; this.alertMessage = 'Task is updated'; });
  }
  back() {
    this.router.navigate(['/tasklist']);
  }
  logout() {
    this.taskService.logout();
    this.router.navigate(['/']);
  }
}
