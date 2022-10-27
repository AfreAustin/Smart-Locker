import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Account } from 'src/app/_interfaces/account';
import { DatabaseService } from '../../../_services/database.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  accounts$: Observable<Account[]> = new Observable();
 
  constructor(private databaseService: DatabaseService) { }
  
  // initially load accounts collection
  ngOnInit(): void {
    this.fetchAccounts();
  }
  
  // delete an account 
  deleteAccount(id: string): void {
    this.databaseService.deleteAccount(id).subscribe({
      next: () => this.fetchAccounts()
    });
  }
  
  // update website-stored collection
  private fetchAccounts(): void {
    this.accounts$ = this.databaseService.getAccounts();
  }
}
