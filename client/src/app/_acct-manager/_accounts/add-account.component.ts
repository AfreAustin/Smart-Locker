import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from 'src/app/_interfaces/account';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-add-account',
  template: `
    <h2> Add a New Account </h2>
    <div>
      <app-account-form (formSubmitted)="addAccount($event)"></app-account-form>
    </div>
  `
})
export class AddAccountComponent {
  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) { }

  // create a new account
  addAccount(account: Account) {
    this.databaseService.createAccount(account)
      .subscribe({
        next: () => {
          this.router.navigate(['/manage/accounts']);
        },
        error: (error) => {
          alert("Failed to create account");
          console.error(error);
        }
      });
  }
}
