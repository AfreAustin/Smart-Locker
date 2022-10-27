import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Item } from '../../_interfaces/item';
import { DatabaseService } from '../../_services/database.service';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  pickups = this.cartService.getPickups();
  returns = this.cartService.getReturns();
  picking = this.formBuilder.group({
    name: ''
  });
  returning = this.formBuilder.group({
    name: ''
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void { }

  // process checkout data
  onPickup(): void {
    console.warn('Your order has been picked up: ', this.picking.value);
    this.picking.reset();
  }

  onReserve(): void {
    console.warn('Your order has been returned: ', this.returning.value);
    this.returning.reset();
  }

  pickingUp(item: Item) {
    this.cartService.addReturns(item);
    this.pickups = this.cartService.removePickups(item);
  }

  returnBack(item: Item) {
    this.returns = this.cartService.removeReturns(item);
  }
}
