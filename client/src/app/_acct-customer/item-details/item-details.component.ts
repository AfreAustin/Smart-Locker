import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

import { Item } from 'src/app/_interfaces/item';
import { DatabaseService } from 'src/app/_services/database.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html'
})
export class ItemDetailsComponent implements OnInit {
  item$: Observable<Item> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    } else {
      this.fetchItem(id);
    }
  }

  private fetchItem(id: string): void {
    this.item$ = this.databaseService.getItem(id);
  }

  // place reserved item into cart
  reserve(item: Item) {
    this.cartService.addPickups(item);       // add item to cart
  }
}