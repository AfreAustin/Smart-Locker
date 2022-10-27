import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Reservation } from 'src/app/_interfaces/reservation';
import { DatabaseService } from 'src/app/_services/database.service';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html'
})
export class ReservationsComponent implements OnInit {
  reservations$: Observable<Reservation[]> = new Observable();
 
  constructor(private databaseService: DatabaseService) { }
  
  // initially load reservations collection
  ngOnInit(): void {
    this.fetchReservations();
  }
  
  // delete a reservation
  deleteReservation(id: string): void {
    this.databaseService.deleteReservation(id).subscribe({
      next: () => this.fetchReservations()
    });
  }
  
  // update website-stored collection
  private fetchReservations(): void {
    this.reservations$ = this.databaseService.getReservations();
  }
}