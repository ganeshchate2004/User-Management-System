// import { Routes } from '@angular/router';
// import { UserListComponent } from './users/user-list/user-list.component';
// import { UserCreateComponent } from './users/user-create/user-create.component';
// import { HomeComponent } from './home/home.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { UserDetailComponent } from './users/user-detail/user-detail.component';
// import { UserUpdateComponent } from './users/user-update/user-update.component';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';

// export const routes: Routes = [
//     {
//         path: '',
//         component: HomeComponent
//     },
//     {
//         path: 'user',
//         component: UserListComponent
//     },
//     {
//         path: 'add-user',
//         component: UserCreateComponent
//     },
//     {
//         path: 'user/:id',
//         component: UserDetailComponent
//     },
//     {
//         path: 'userUpdate/:id',
//         component: UserUpdateComponent
//     },
//     {
//         path: 'login',
//         component: LoginComponent
//     },
//     {
//         path: 'signup',
//         component: SignupComponent
//     },
//     {
//         path: '**',
//         component: PageNotFoundComponent
//     }
// ];



import { Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GuestGuard } from './shared/guest.guard';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [GuestGuard] },
  { path: 'user', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'userUpdate/:id', component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];
