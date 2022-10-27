import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Item } from '../_interfaces/item';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  pickup: Item[] = [];
  returns: Item[] = [];

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService) { }

  getPickups() { return this.pickup; }
  addPickups(item: Item) { this.pickup.push(item); }
  removePickups(item: Item) {
    const index = this.pickup.indexOf(item);          // find index of item
    if (index > -1) { this.pickup.splice(index, 1); } // remove item if found
    return this.pickup;                               // return updated array
  }

  
  getReturns() { return this.returns; }
  addReturns(item: Item) { this.returns.push(item); }
  removeReturns(item: Item) {
    const index = this.returns.indexOf(item);          // find index of item
    if (index > -1) { this.returns.splice(index, 1); } // remove item if found
    return this.returns;                               // return updated array
  }
}