import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { bookingdetails } from '../models/bookingdetails';

@Injectable({ providedIn: 'root' })
export class BookingService{    
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    bookings:bookingdetails=new bookingdetails();
    status:boolean;
    
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    addBookingDetails(details: bookingdetails){        
        return this.http.post<any>(`http://localhost:9080/sbp/api/v1/booking`,  details )
        .pipe(map(results=>{
            console.log(results);
            this.status=results;
            return this.status;
           }));
        }
        updateBookingDetails(details: bookingdetails){        
            return this.http.put<any>(`http://localhost:9080/sbp/api/v1/booking`,  details )
            .pipe(map(results=>{
                console.log(results);
                this.bookings=results;
                return this.bookings;
               }));
            }
 adminMaintanence(bookingDate : String){
    return this.http.post<any>(`http://localhost:9080/sbp/api/v1/admin/maintenanence/`+bookingDate+'/', '')
        .pipe(map(results=>{
            console.log(results);
                return results;
           }));
 }   
    
}