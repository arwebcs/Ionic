import { Component, ViewChildren, QueryList } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    private _location: Location
  ) {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this._location.isCurrentPathEqualTo('/home')) {
        this.showExitConfirm();
        // processNextHandler();
      } else {
        this._location.back();
      }
    });
  }
  showExitConfirm() {
    this.alertController
      .create({
        header: 'App termination',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
          },
          {
            text: 'Logout',
            handler: () => {
              localStorage.clear();
              this.router.navigate(['']);
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
