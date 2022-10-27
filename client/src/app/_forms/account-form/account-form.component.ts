import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Account } from '../../_interfaces/account'; 

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html'
})
export class AccountFormComponent implements OnInit {
  // initial state of form
  @Input()
  initialState: BehaviorSubject<Account> = new BehaviorSubject({});
  // emit form values during submissions
  @Output()
  formValuesChanged = new EventEmitter<Account>();
  @Output()
  formSubmitted = new EventEmitter<Account>();

  accountForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  // get account details
  get userName() { return this.accountForm.get('userName')!; }
  get password() { return this.accountForm.get('password')!; }
  get userType() { return this.accountForm.get('userType')!; }
  get userRFID() { return this.accountForm.get('userRFID')!; }
  get foreName() { return this.accountForm.get('foreName')!; }
  get lastName() { return this.accountForm.get('lastName')!; }

  // load current state of form
  ngOnInit() {
    // initial state of form
    this.initialState.subscribe(account => {
      this.accountForm = this.fb.group({
        userName: [ account.userName, [Validators.required, Validators.minLength(3)] ],
        password: [ account.password, [Validators.required, Validators.minLength(5)] ],
        userType: [ account.userType, [Validators.required] ],
        userRFID: [ account.userRFID, [Validators.required, Validators.minLength(5)] ],
        foreName: [ account.foreName, [Validators.required, Validators.minLength(1)] ],
        lastName: [ account.lastName, [Validators.required, Validators.minLength(1)] ]
      });
    });

    // changed state of form
    this.accountForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  // emits values in form
  submitForm() {
    this.formSubmitted.emit(this.accountForm.value);
  }
}