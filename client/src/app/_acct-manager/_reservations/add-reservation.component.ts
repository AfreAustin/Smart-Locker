import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Reservation } from 'src/app/_interfaces/reservation';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-add-reservation',
  template: `
    <h2> Add a New Reservation </h2>
    <div>
      <app-reservation-form (formSubmitted)="addReservation($event)"></app-reservation-form>
    </div>
  `
})
export class AddReservationComponent {
  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) { }

  // create a new reservation
  addReservation(reservation: Reservation) {
    this.databaseService.createReservation(reservation)
      .subscribe({
        next: () => {
          this.router.navigate(['/manage/reservations']);
        },
        error: (error) => {
          alert("Failed to create reservation");
          console.error(error);
        }
      });
  }
}
