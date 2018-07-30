import { ITask } from '../Model/task';
import { Component, Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod, BaseRequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class TaskService {
    taskUrl = 'http://localhost:3000/task';
    constructor(private http: Http) {}

    tasklist(): Observable<ITask[]> {
        const jwtToken = localStorage.getItem('jwtToken');
        const currentUser = localStorage.getItem('currentUser');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('x-access-token', jwtToken);
        // appending user in header
        headers.append('x-user', currentUser);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.taskUrl + '/tasklist', options)
        .map((response: Response) => <ITask[]> response.json())
        .catch(this.handleError);
    }

    tasknew(task: ITask): Observable<ITask> {
        const jwtToken = localStorage.getItem('jwtToken');
        const currentUser = localStorage.getItem('currentUser');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('x-access-token', jwtToken);
        // appending user in header
        headers.append('x-user', currentUser);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.taskUrl + '/tasknew', task, options)
        .map((response: Response) => <ITask> response.json())
        .catch(this.handleError);
    }
    taskbyid(_id): Observable<ITask> {
        const jwtToken = localStorage.getItem('jwtToken');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('x-access-token', jwtToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.taskUrl}/${_id}`, options)
        .map((response: Response) => <ITask>response.json())
        .catch(this.handleError);
    }
    taskupdate(task: ITask): Observable<ITask> {
        const jwtToken = localStorage.getItem('jwtToken');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('x-access-token', jwtToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.patch(this.taskUrl + '/' + task._id, task, options)
        .map((response: Response) => <ITask> response.json())
        .catch(this.handleError);
    }
    logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('expires_At');
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
