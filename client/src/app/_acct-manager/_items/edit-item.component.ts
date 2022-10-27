import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Item } from 'src/app/_interfaces/item';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-edit-item',
  template: `
    <h2>Edit an Item</h2>
    <div>
      <app-item-form [initialState]="item" (formSubmitted)="editItem($event)"></app-item-form>
    </div>
  `
})
export class EditItemComponent implements OnInit {
  item: BehaviorSubject<Item> = new BehaviorSubject({});
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
  ) { }
  
  // initially find item and track form changes
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.databaseService.getItem(id !).subscribe((item) => {
      this.item.next(item);
    });
  }
  
  // edit an existing item
  editItem(item: Item) {
    this.databaseService.updateItem(this.item.value._id || '', item)
      .subscribe({
        next: () => {
          this.router.navigate(['/manage/items']);
        },
        error: (error) => {
          alert('Failed to update item');
          console.error(error);
        }
      })
  }
}
