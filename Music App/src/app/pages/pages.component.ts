import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <app-header></app-header>
    <router-outlet (activate)="onActivate($event)" ></router-outlet>
  `,
})
export class PagesComponent implements OnInit {

  constructor() { }
  onActivate(event) {
    window.scroll(0, 0);
  }

  ngOnInit() {

  }
}
