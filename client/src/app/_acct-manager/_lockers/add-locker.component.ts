import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Locker } from 'src/app/_interfaces/locker';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-add-locker',
  template: `
    <h2> Add a New Locker </h2>
    <div>
      <app-locker-form (formSubmitted)="addLocker($event)"></app-locker-form>
    </div>
  `
})
export class AddLockerComponent {
  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) { }

  // create a new locker
  addLocker(locker: Locker) {
    this.databaseService.createLocker(locker)
      .subscribe({
        next: () => {
          this.router.navigate(['/manage/lockers']);
        },
        error: (error) => {
          alert("Failed to create locker");
          console.error(error);
        }
      });
  }
}
