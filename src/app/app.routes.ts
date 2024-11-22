import { Routes } from '@angular/router';
import {CommonComponent} from './common/common.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {profileResolver} from './profile/profile.resolver';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component:CommonComponent,
    children:[
      {
        path: 'tutorial',
        component: HomeComponent,
        canActivate: [authGuard],
    }
    ,{
        path: 'login',
        component: LoginComponent,
      },{
      path: 'register',
        component: RegisterComponent,
      },
      {
        path:'profile',
         component: ProfileComponent,
        resolve:{profileData:profileResolver},
        canActivate: [authGuard],
      }
    ]
  }

];
