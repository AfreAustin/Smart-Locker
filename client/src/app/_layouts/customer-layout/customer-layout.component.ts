import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-layout',
  template: `
      <div class="container">
        <app-customer-header></app-customer-header>
      </div>

      <div class="container">
          <router-outlet></router-outlet>
      </div>
  `
})
export class CustomerLayoutComponent {
  constructor() { }
}
