import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Account } from 'src/app/_interfaces/account';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-edit-account',
  template: `
    <h2>Edit an Account</h2>
    <div>
      <app-account-form [initialState]="account" (formSubmitted)="editAccount($event)"></app-account-form>
    </div>
  ` 
})
export class EditAccountComponent implements OnInit {
  account: BehaviorSubject<Account> = new BehaviorSubject({});
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
  ) { }
  
  // initially find account and track form changes
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.databaseService.getAccount(id !).subscribe((account) => {
      this.account.next(account);
    });
  }
  
  // edit an existing account
  editAccount(account: Account) {
    this.databaseService.updateAccount(this.account.value._id || '', account)
      .subscribe({
        next: () => {
          this.router.navigate(['/manage/accounts']);
        },
        error: (error) => {
          alert('Failed to update account');
          console.error(error);
        }
      })
  }
}