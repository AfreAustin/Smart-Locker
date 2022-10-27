import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import { Item } from 'src/app/_interfaces/item';
import { Locker } from 'src/app/_interfaces/locker';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent implements OnInit {
  lockers$: Observable<Locker[]> = new Observable();

  // initial state of form
  @Input()
  initialState: BehaviorSubject<Item> = new BehaviorSubject({});
  // emit form values during submissions
  @Output()
  formValuesChanged = new EventEmitter<Item>();
  @Output()
  formSubmitted = new EventEmitter<Item>();

  itemForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService) { }

  // get item details
  get itemName() { return this.itemForm.get('itemName')!; }
  get itemDesc() { return this.itemForm.get('itemDesc')!; }
  get itemIcon() { return this.itemForm.get('itemIcon')!; }
  get itemLock() { return this.itemForm.get('itemLock')!; }
  get itemReqs() { return this.itemForm.get('itemReqs')!; }
  get itemFree() { return this.itemForm.get('itemFree')!; }

  // load current state of form
  ngOnInit() {
    this.fetchLockers();

    // initial state of form
    this.initialState.subscribe(item => {
      this.itemForm = this.fb.group({
        itemName: [ item.itemName, [Validators.required, Validators.minLength(3)] ],
        itemDesc: [ item.itemDesc, [Validators.required, Validators.minLength(3)] ],
        itemIcon: [ item.itemIcon, [Validators.required, Validators.minLength(3)] ],
        itemLock: [ item.itemLock, [Validators.required, Validators.minLength(3)] ],
        itemReqs: [ item.itemReqs, [Validators.required, Validators.minLength(3)] ],
        itemFree: [ item.itemFree, [Validators.required] ]
      });
    });

    // changed state of form
    this.itemForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  // emits values in form
  submitForm() {
    this.formSubmitted.emit(this.itemForm.value);
  }

  private fetchLockers(): void {
    this.lockers$ = this.databaseService.getLockers();
  }
}