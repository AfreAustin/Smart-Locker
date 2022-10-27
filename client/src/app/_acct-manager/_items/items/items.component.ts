import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from 'src/app/_interfaces/item';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
  items$: Observable<Item[]> = new Observable();
 
  constructor(private databaseService: DatabaseService) { }
  
  // initially load items collection
  ngOnInit(): void {
    this.fetchItems();
  }
  
  // delete an item
  deleteItem(id: string): void {
    this.databaseService.deleteItem(id).subscribe({
      next: () => this.fetchItems()
    });
  }
  
  // update website-stored collection
  private fetchItems(): void {
    this.items$ = this.databaseService.getItems();
  }
}