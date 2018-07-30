import { IUser } from '../Model/user';
import { Component, Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import * as moment from 'moment';

@Injectable()
export class AuthenticationService {
    userUrl = 'http://localhost:3000/user';

    constructor(private http: Http) {}

    signin(user: IUser): Observable<IUser> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.userUrl + '/signin', user, options)
         .map((response: Response) => {console.log(response); this.setSession(response.json()); })
        .catch(this.handleError);
    }
    signup(user: IUser): Observable<IUser> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.userUrl + '/signup', user, options)
        .map((response: Response) => {console.log(response); this.setSession(response.json()); })
        .catch(this.handleError);
    }
    private setSession(authResult) {
        localStorage.setItem('currentUser', authResult.user);
        console.log('Current User: ' + authResult.user);
        localStorage.setItem('jwtToken', authResult.token);
        console.log('JWT TOKEN is stored in local storage: ' + authResult.token);
        localStorage.setItem('expires_At', JSON.stringify(authResult.expiresIn.valueOf()));
        console.log('Token Expired In: ' + JSON.stringify(authResult.expiresIn.valueOf()));
    }
    private handleError(error: Response) {
        console.error(error);
        console.log('Error Status: ' + error.status);
        return Observable.throw(error || 'Server error');
    }

}

