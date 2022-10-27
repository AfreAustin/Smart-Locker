import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Locker } from '../../_interfaces/locker';

@Component({
  selector: 'app-locker-form',
  templateUrl: './locker-form.component.html'
})
export class LockerFormComponent implements OnInit {
  // initial state of form
  @Input()
  initialState: BehaviorSubject<Locker> = new BehaviorSubject({});
  // emit form values during submissions
  @Output()
  formValuesChanged = new EventEmitter<Locker>();
  @Output()
  formSubmitted = new EventEmitter<Locker>();

  lockerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  // get locker details
  get lockName() { return this.lockerForm.get('lockName')!; }
  get lastOpen() { return this.lockerForm.get('lastOpen')!; }
  get lastShut() { return this.lockerForm.get('lastShut')!; }

  // load current state of form
  ngOnInit() {
    // initial state of form
    this.initialState.subscribe(locker => {
      this.lockerForm = this.fb.group({
        lockName: [ locker.lockName, [Validators.required, Validators.minLength(3)] ],
        lastOpen: [ locker.lastOpen, [Validators.required, Validators.minLength(3)] ],
        lastShut: [ locker.lastShut, [Validators.required, Validators.minLength(3)] ]
      });
    });

    // changed state of form
    this.lockerForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  // emits values in form
  submitForm() {
    this.formSubmitted.emit(this.lockerForm.value);
  }
}
