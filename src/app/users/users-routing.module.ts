import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view',
    pathMatch: 'full',
  },
  {
    path: 'view',
    component: UsersPage,
    data: { title: 'CRUD::User view' },
  },
  {
    path: 'add',
    component: AddUsersComponent,
    data: { title: 'CRUD::User add' },
  },
  {
    path: 'edit/:userID',
    component: EditUsersComponent,
    data: { title: 'CRUD::User edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
