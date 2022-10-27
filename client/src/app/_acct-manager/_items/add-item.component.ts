import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from 'src/app/_interfaces/item';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-add-item',
  template: `
    <h2> Add a New Item </h2>
    <div>
      <app-item-form (formSubmitted)="addItem($event)"></app-item-form>
    </div>
  ` 
})
export class AddItemComponent {
  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) { }

  // create a new item
  addItem(item: Item) {
    this.databaseService.createItem(item)
      .subscribe({
        next: () => {
          this.router.navigate(['/manage/items']);
        },
        error: (error) => {
          alert("Failed to create item");
          console.error(error);
        }
      });
  }
}
