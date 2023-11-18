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
  //code for exit app
  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    private _location: Location
  ) {
    // Initialize BackButton Eevent.
    //this.backButtonEvent();

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      // console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/home')) {
        // Show Exit Alert!
        // console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {
        // Navigate to back page
        // console.log('Navigate to back page');
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
