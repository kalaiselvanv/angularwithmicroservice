
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BookingService } from '../services/booking.service';
import { bookingdetails } from '../models/bookingdetails';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  errorFlag: boolean;
  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  details: bookingdetails =new bookingdetails();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingservice:BookingService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      employeeid: ['', Validators.required],
      address: ['', Validators.required],
      seatnumber:['', Validators.required],
      floornumber:['', Validators.required],
      bookingdate : ['', Validators.required],
      slot:['', Validators.required],
  });
  this.returnUrl = 'add';
  }


  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
        return;
    }
    this.details.employeeId=this.f.employeeid.value;
    this.details.address=this.f.address.value;
    this.details.floorNumber=this.f.floornumber.value;
    this.details.seatNumber=this.f.seatnumber.value;
    this.details.slot=this.f.slot.value;
    this.details.bookingDate=this.f.bookingdate.value;
    this.details.userName=JSON.parse(localStorage.getItem('currentUser')).userName;
    this.loading = true;    
        this.bookingservice.addBookingDetails(this.details)
            .pipe(first())
            .subscribe(
                data => {                  
                   this.router.navigate(['/home']);
                },
                error => {                   
                    this.loading = false;
                    if(error.status==401 || error.status==417 || error.status==500){
                        this.errorFlag=true;
                    }
                });
   
}

cancel(){
  this.router.navigate(['/home']);
}

}
