import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-adminupdate',
  templateUrl: './adminupdate.component.html',
  styleUrls: ['./adminupdate.component.scss']
})
export class AdminupdateComponent implements OnInit {
  errorFlag: boolean;
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  bookingDate:any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingservice:BookingService,
    private datePipe:DatePipe
  ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
     
      bookingdate : ['', Validators.required]
  });
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }
    
    this.bookingDate=this.f.bookingdate.value;
    var dte=this.datePipe.transform(this.bookingDate,'yyyy-MM-dd');//.toLocaleDateString().replace(/\//g,"-");
   
        this.bookingservice.adminMaintanence(dte)
            .pipe(first())
            .subscribe(
                data => {                  
                   this.router.navigate(['/home']);
                },
                error => {                   
                    this.loading = false;
                    if(error.status==417 || error.status==500){
                        this.errorFlag=true;
                    }
                });
   
}

cancel(){
  this.router.navigate(['/home']);
}

}
