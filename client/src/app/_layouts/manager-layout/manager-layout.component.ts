import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-layout',
  template: `
    <div class="container">
      <app-manager-header></app-manager-header>
    </div>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class ManagerLayoutComponent {
  constructor() { }

}
