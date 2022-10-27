import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from 'src/app/_interfaces/item';
import { DatabaseService } from 'src/app/_services/database.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]> = new Observable();

  constructor(private databaseService: DatabaseService) { }
  
  ngOnInit(): void {
    this.fetchItems();
  }

  private fetchItems(): void {
    this.items$ = this.databaseService.getItems();
  }

  
}
