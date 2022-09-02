import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { appRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './jwt.interceptor';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule, MatInputModule, MatSortModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminupdateComponent } from './adminupdate/adminupdate.component';
import { DatePipe } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AuthGuard } from './services/auth-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddComponent,
    EditComponent,
    AdminupdateComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule   
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DatePipe,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
