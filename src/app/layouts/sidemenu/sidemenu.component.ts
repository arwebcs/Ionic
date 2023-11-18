import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  @Input('toggleVal') toggle: any;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.toggle === 1) {
      let addElem: any = document.getElementById('sidebar');
      addElem.classList.add('collapsed');
    } else {
      let remElm: any = document.getElementById('sidebar');
      remElm.classList.remove('collapsed');
    }
  }

  redirect(url: string) {
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  ngDoCheck() {
    if (this.toggle === 1) {
      let addElem: any = document.getElementById('sidebar');
      addElem.classList.add('collapsed');
    } else {
      let remElm: any = document.getElementById('sidebar');
      remElm.classList.remove('collapsed');
    }
  }
}
