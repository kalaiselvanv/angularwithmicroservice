import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));        
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    setLoginStatus(value) {
        this.loggedInStatus = value;
        localStorage.setItem('loggedIn', 'true');
      }

    login(userName: string, password: string) {
        return this.http.post<any>(`http://localhost:9080/sbp/api/v1/token`, { userName, password })
            .pipe(map(user => {
                console.log(user)
                // login successful if there's a jwt token in the response
               if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loggedIn');
        this.currentUserSubject.next(null);
    }
    get LoginStatus() {        
        console.log("stat--",JSON.parse(localStorage.getItem('loggedIn') ||   this.loggedInStatus.toString()))
        return JSON.parse(localStorage.getItem('loggedIn') ||   this.loggedInStatus.toString());
      }
}
