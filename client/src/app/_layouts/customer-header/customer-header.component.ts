import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-header',
  template: `
    <a [routerLink]="['/customer/items']" class="button">
      <img src="../../../assets/logo.svg" width="50" height="50">
    </a>

    <h1>Smart Locker</h1>

    <a routerLink="/login" class="button fancy-button">
      <i class="material-icons">logout</i>
    </a>

    <a routerLink="/customer/cart" class="button fancy-button">
      <i class="material-icons">devices</i>
    </a>
  `
})
export class CustomerHeaderComponent {
  constructor() { }
}
