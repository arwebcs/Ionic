import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopComponent } from './top/top.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { BottomComponent } from './bottom/bottom.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TopComponent, SidemenuComponent, BottomComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopComponent, SidemenuComponent, BottomComponent],
})
export class LayoutsModule {}
