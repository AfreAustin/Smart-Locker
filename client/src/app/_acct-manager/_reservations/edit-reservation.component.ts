import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Reservation } from 'src/app/_interfaces/reservation';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-edit-reservation',
  template: `
    <h2>Edit a Reservation</h2>
    <div>
      <app-reservation-form [initialState]="reservation" (formSubmitted)="editReservation($event)"></app-reservation-form>
    </div>
  `
})
export class EditReservationComponent implements OnInit {
  reservation: BehaviorSubject<Reservation> = new BehaviorSubject({});
 
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
  
    this.databaseService.getReservation(id !).subscribe((reservation) => {
      this.reservation.next(reservation);
    });
  }
  
  // edit an existing reservation
  editReservation(reservation: Reservation) {
    this.databaseService.updateReservation(this.reservation.value._id || '', reservation)
      .subscribe({
        next: () => {
          this.router.navigate(['/manage/reservations']);
        },
        error: (error) => {
          alert('Failed to update reservations');
          console.error(error);
        }
      })
  }
}
