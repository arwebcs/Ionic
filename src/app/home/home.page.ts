import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {
  toggle: any = 0;
  constructor() {}

  getTog(event: Event) {
    this.toggle = event;
  }
}
