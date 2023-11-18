import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  //code for exit app
  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  //code for exit app
  @ViewChildren(IonRouterOutlet) routerOutlets!: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private router: Router
  ) {
    // Initialize BackButton Eevent.
    this.backButtonEvent();
  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === '/home') {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            const navigator: any = '';
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // work in ionic 4
          } else {
            const toast = await this.toastController.create({
              message: 'Press back again to exit App.',
              duration: 2000,
              position: 'middle',
            });
            toast.present();
            // console.log(JSON.stringify(toast));
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
}
