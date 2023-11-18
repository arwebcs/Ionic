import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  imports: [CommonModule, LayoutsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage],
})
export class HomePageModule {}
