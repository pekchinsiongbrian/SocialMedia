import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditpostComponent } from './editpost/editpost.component';
import { AdminGuard } from './guards/admin.guard';
import { SecureGuard } from './guards/secure.guard';
import { HomeComponent } from './home/home.component';
import { IndivpostComponent } from './indivpost/indivpost.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { PostfeedComponent } from './postfeed/postfeed.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostfeedComponent,
    canActivate: [SecureGuard],
  },
  {
    path: 'posts/:id',
    component: IndivpostComponent,
    canActivate: [SecureGuard]
  },
  {
    path: 'posts/edit/:id',
    component: EditpostComponent,
    canActivate: [SecureGuard]
  },
  {
    path: 'manage_users',
    component: ManageusersComponent,
    canActivate: [SecureGuard, AdminGuard]
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
