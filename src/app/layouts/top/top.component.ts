import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
})
export class TopComponent implements OnInit {
  tog: number = 0;

  constructor() {}

  @Output('togg') togg = new EventEmitter();

  ngOnInit() {}

  toggle(val: number) {
    console.log(val);
    if (val === 0) {
      this.tog = 1;
      this.togg.emit(this.tog);
    } else {
      this.tog = 0;
      this.togg.emit(this.tog);
    }
  }
}
