import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { LayoutsModule } from '../layouts/layouts.module';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    IonicModule,
    UsersPageRoutingModule,
  ],
  declarations: [UsersPage, AddUsersComponent, EditUsersComponent, SearchPipe],
})
export class UsersPageModule {}
