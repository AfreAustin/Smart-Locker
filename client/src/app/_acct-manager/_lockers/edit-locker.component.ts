import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Locker } from 'src/app/_interfaces/locker';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-edit-locker',
  template: `
    <h2>Edit a Locker</h2>
    <div>
      <app-locker-form [initialState]="locker" (formSubmitted)="editLocker($event)"></app-locker-form>
    </div>
  `
})
export class EditLockerComponent implements OnInit {
  locker: BehaviorSubject<Locker> = new BehaviorSubject({});
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
  ) { }
  
  // initially find reservation and track form changes
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.databaseService.getLocker(id !).subscribe((locker) => {
      this.locker.next(locker);
    });
  }
  
  // edit an existing locker
  editLocker(locker: Locker) {
    this.databaseService.updateLocker(this.locker.value._id || '', locker)
      .subscribe({
        next: () => {
          this.router.navigate(['/manage/lockers']);
        },
        error: (error) => {
          alert('Failed to update locker');
          console.error(error);
        }
      })
  }
}
