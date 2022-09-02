import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { searchrequest } from '../models/searchrequest';
import { searchresults } from '../models/searchresults';

@Injectable({ providedIn: 'root' })
export class HomeService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    result:searchresults=new searchresults();

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    adminSearch(srequest : searchrequest) {
        let url='';
        if(srequest.clientRole){
            url='http://localhost:9080/sbp/api/v1/booking/search'
        }else{
            url='http://localhost:9080/sbp/api/v1/admin/search';
        }

        return this.http.post<any>(url,  srequest )
        .pipe(map(results=>{
            console.log(results);
            this.result=results;
            return this.result;
           }));
        }
}