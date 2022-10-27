import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Locker } from 'src/app/_interfaces/locker';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html'
})
export class LockersComponent implements OnInit {
  lockers$: Observable<Locker[]> = new Observable();
 
  constructor(private databaseService: DatabaseService) { }
  
  // initially load lockers collection
  ngOnInit(): void {
    this.fetchLockers();
  }
  
  // delete a locker
  deleteLocker(id: string): void {
    this.databaseService.deleteLocker(id).subscribe({
      next: () => this.fetchLockers()
    });
  }
  
  // update website-stored collection
  private fetchLockers(): void {
    this.lockers$ = this.databaseService.getLockers();
  }
}
