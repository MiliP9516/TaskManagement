import { Component, OnInit } from '@angular/core';
import { ITask } from '../Model/task';
import { TaskService } from '../service/task.service';
import { FormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Routes, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  task: ITask;
  tasks: ITask[];
  name = 'admin';
  constructor(private taskService: TaskService,  private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Onloading of page');
      this.tasklist();
  }

  public tasklist() {
    this.taskService.tasklist()
    .subscribe(data => { this.tasks = data; }, (error) => {
      if (error.status === 500) {

        this.router.navigate(['/']);
      } else {console.log(error); }
       },
  () => {console.log(this.tasks); });
  }

  changeStatus(event, _id) {
    status = event.target.value;
    console.log('status changed' + status);
    console.log('status changed' + _id);
    this.taskService.taskbyid(_id)
    .subscribe (data => {data.status = status; console.log(data.status); this.updatestatus(data); }, (error) => {console.log(error); },
  () => {console.log('status is updated'); });
  }

  public updatestatus(task) {
    this.taskService.taskupdate(task)
    .subscribe(data => {this.task = data; }, (error) => {console.log(error); },
  () => { console.log('status changed...');
    console.log(this.task); });
  }

  tasknew() {
    console.log('create new');
    this.router.navigate(['/tasknew']);
  }

  updatetask(id) {
    console.log(id);
    this.router.navigate(['/taskupdate', id]);
  }

  logout() {
    this.taskService.logout();
    this.router.navigate(['/']);
  }
}
