import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import { Reservation } from 'src/app/_interfaces/reservation';
import { Item } from 'src/app/_interfaces/item';
import { Account } from 'src/app/_interfaces/account';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html'
})
export class ReservationFormComponent implements OnInit {
  items$: Observable<Item[]> = new Observable();
  accounts$: Observable<Account[]> = new Observable();

  // initial state of form
  @Input()
  initialState: BehaviorSubject<Reservation> = new BehaviorSubject({});
  // emit form values during submissions
  @Output()
  formValuesChanged = new EventEmitter<Reservation>();
  @Output()
  formSubmitted = new EventEmitter<Reservation>();

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService) { }

  // get reservation details
  get itemName() { return this.reservationForm.get('itemName')!; }
  get userName() { return this.reservationForm.get('userName')!; }
  get strtTime() { return this.reservationForm.get('strtTime')!; }
  get stopTime() { return this.reservationForm.get('stopTime')!; }
  
  // load current state of form
  ngOnInit() {
    this.fetchItems();
    this.fetchAccounts();

    // initial state of form
    this.initialState.subscribe(reservation => {
      this.reservationForm = this.fb.group({
        itemName: [ reservation.itemName, [Validators.required, Validators.minLength(3)] ],
        userName: [ reservation.userName, [Validators.required, Validators.minLength(3)] ],
        strtTime: [ reservation.strtTime, [Validators.required, Validators.minLength(3)] ],
        stopTime: [ reservation.stopTime, [Validators.required, Validators.minLength(3)] ]
      });
    });

    // changed state of form
    this.reservationForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  // emits values in form
  submitForm() {
    this.formSubmitted.emit(this.reservationForm.value);
  }

  private fetchItems(): void {
    this.items$ = this.databaseService.getItems();
  }
  private fetchAccounts(): void {
    this.accounts$ = this.databaseService.getAccounts();
  }
}
