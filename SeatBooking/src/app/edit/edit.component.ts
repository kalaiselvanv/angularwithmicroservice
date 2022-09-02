import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { bookingdetails } from '../models/bookingdetails';
import { searchrequest } from '../models/searchrequest';
import { searchresults } from '../models/searchresults';
import { HomeService } from '../services/home.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  errorFlag: boolean;
  clientRole: boolean;
  editForm: FormGroup;  
  req: searchrequest=new searchrequest();
  result:searchresults=new searchresults();
  details:bookingdetails=new bookingdetails();
  statusList: any =['Pending','Confirmed','Cancelled'];
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private bookingservice:BookingService,
      private homeservice:HomeService
  ) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      address: ['', Validators.required],
      seatNumber:['', Validators.required],
      floorNumber:['', Validators.required],
      bookingDate : ['', Validators.required],
      slot:['', Validators.required],
      status:['', Validators.required]
  });

    const id=this.route.snapshot.params['id'];
    this.req.clientRole=false;
    /*this.req.pageSize=20;
    this.req.pageNumber=1;*/
    this.req.bookingId='B'+id;
    this.homeservice.adminSearch(this.req).pipe(first())
    .subscribe(
        data => {
          console.log("data",data);
          this.result=data;
          console.log("res",this.result.bookingDetails);
          this.details=this.result.bookingDetails[0];
          this.editForm.patchValue(this.details);
    });

    if(JSON.parse(localStorage.getItem('currentUser')).adminRoleCheck){      
     this.clientRole=false;
    }else{      
      this.clientRole=true;
    }
  }

  get f() { return this.editForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }
    this.details.employeeId=this.f.employeeId.value;
    this.details.address=this.f.address.value;
    this.details.floorNumber=this.f.floorNumber.value;
    this.details.seatNumber=this.f.seatNumber.value;
    this.details.slot=this.f.slot.value;
    this.details.bookingDate=this.f.bookingDate.value;
    this.details.userName=JSON.parse(localStorage.getItem('currentUser')).userName;
    this.details.status=this.f.status.value;
    this.loading = true;    
        this.bookingservice.updateBookingDetails(this.details)
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
