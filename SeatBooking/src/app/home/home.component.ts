import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { searchrequest } from '../models/searchrequest';
import { searchresults } from '../models/searchresults';
import { HomeService } from '../services/home.service';
import { bookingdetails } from '../models/bookingdetails';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading =false;
  errorFlag: boolean;
  searchForm: FormGroup;
  result:searchresults=new searchresults();
  req: searchrequest=new searchrequest();
  private paginator:MatPaginator;
  private sort:MatSort;
  clientCheck:boolean;
  //bookingDetails: bookingdetails[]=[];
  bookingDetailsRes: Element[] = [];
    displayedColumns = ['id','address','bookingDate','status','employeeId'];
    dataSource = new MatTableDataSource<Element>(this.bookingDetailsRes);

    @ViewChild (MatPaginator, { static: false }) set matpaginator (mp: MatPaginator){
      this.paginator=mp;
      if(this.dataSource){
        this.dataSource.paginator = this.paginator;
      }
    }
    @ViewChild (MatSort, { static: false }) set matSort (mp: MatSort){
      this.sort=mp;
      if(this.dataSource){
        this.dataSource.sort = this.sort;
      }
    }
   

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private homeservice:HomeService

  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      bookingid :'',
      bookingaddress: '',
      bookingdate : ''
  });

  if(JSON.parse(localStorage.getItem('currentUser')).adminRoleCheck){
    this.req.clientRole=false;
   this.clientCheck=false;
  }else{
    this.req.clientRole=true;
    this.clientCheck=true;
  }
  
  
    /*this.req.pageSize=20;
    this.req.pageNumber=1;*/
    if(this.req.clientRole){
      this.req.userName=JSON.parse(localStorage.getItem('currentUser')).userName;
       }
    this.loadSearchResults(this.req);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort =this.sort;
  }

  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLocaleLowerCase();
    if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage;
    }
  }
  onSubmit() {
    this.loading = true;
    if(JSON.parse(localStorage.getItem('currentUser')).adminRoleCheck){
      this.req.clientRole=false;
    }else{
      this.req.clientRole=true;
    }
    
   /* this.req.pageSize=20;
    this.req.pageNumber=1;*/
    if(this.searchForm.controls.bookingid.value!=undefined && this.searchForm.controls.bookingid.value!=null 
      && this.searchForm.controls.bookingid.value!=''){
    this.req.bookingId=this.searchForm.controls.bookingid.value;
      }
      if(this.searchForm.controls.bookingaddress.value!=undefined && this.searchForm.controls.bookingaddress.value!=null 
        && this.searchForm.controls.bookingaddress.value!=''){
      this.req.address=this.searchForm.controls.bookingaddress.value;
        }
        if(this.searchForm.controls.bookingdate.value!=undefined && this.searchForm.controls.bookingdate.value!=null 
          && this.searchForm.controls.bookingdate.value!=''){
        this.req.bookingDate=this.searchForm.controls.bookingdate.value;
          }
          
          if(this.req.clientRole){
         this.req.userName=JSON.parse(localStorage.getItem('currentUser')).userName;
          }
    this.loadSearchResults(this.req);
    
  }
  loadSearchResults(req : searchrequest){
    
    this.homeservice.adminSearch(this.req).pipe(first())
    .subscribe(
        data => {
          console.log("data",data);
          this.result=data;
          console.log("res",this.result.bookingDetails);
          this.dataSource=new MatTableDataSource<any>(this.result.bookingDetails);        
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    this.loading = false;
    },
    error => {                   
        this.loading = false;
        if(error.status==401 || error.status==417 || error.status==500){
            this.errorFlag=true;
        }
    });
    
  }

  addClick(){
    this.router.navigateByUrl("add");
  }

  adminBulkUpdate(){
this.router.navigateByUrl("adminupdate");
  }

}

export interface Element {
  id : number;
	prefix : String;
	employeeId:String;
	address:String;
	seatNumber:String;
	floorNumber:number;
	bookingDate:Date;
	slot:String;
	status:String;
	userName:String;
  
}
//const bookingDetails: Element[] = [];
