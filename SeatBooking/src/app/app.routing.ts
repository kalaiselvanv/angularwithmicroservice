import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AdminupdateComponent } from './adminupdate/adminupdate.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  
    { path: 'login', component: LoginComponent,     data:{title:''}},
    { path: 'home', component: HomeComponent, data:{title:'Home'},canActivate: [AuthGuard] },
    {path:'add', component:AddComponent, data:{title:'Add'},canActivate: [AuthGuard]},
    {path:'home/:id/edit', component:EditComponent, data:{title:'Edit'},canActivate: [AuthGuard]},
    {path:'adminupdate', component:AdminupdateComponent, data:{title:'Maintenance'},canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '', redirectTo: '/login', pathMatch:'full' }
];

export const appRoutingModule = RouterModule.forRoot(routes);