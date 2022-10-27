import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ManagerLayoutComponent } from './_layouts/manager-layout/manager-layout.component';
import { CustomerLayoutComponent } from './_layouts/customer-layout/customer-layout.component';

import { AccountsComponent } from './_acct-manager/_accounts/accounts/accounts.component';
import { AddAccountComponent } from './_acct-manager/_accounts/add-account.component';
import { EditAccountComponent } from './_acct-manager/_accounts/edit-account.component';  
import { ItemsComponent } from './_acct-manager/_items/items/items.component';
import { AddItemComponent } from './_acct-manager/_items/add-item.component';
import { EditItemComponent } from './_acct-manager/_items/edit-item.component'; 
import { LockersComponent } from './_acct-manager/_lockers/lockers/lockers.component';
import { AddLockerComponent } from './_acct-manager/_lockers/add-locker.component';
import { EditLockerComponent } from './_acct-manager/_lockers/edit-locker.component';
import { ReservationsComponent } from './_acct-manager/_reservations/reservations/reservations.component';
import { AddReservationComponent } from './_acct-manager/_reservations/add-reservation.component';
import { EditReservationComponent } from './_acct-manager/_reservations/edit-reservation.component'; 
import { ManagerHomeComponent } from './_acct-manager/manager-home/manager-home.component';

import { ItemListComponent } from './_acct-customer/item-list/item-list.component';
import { ItemDetailsComponent } from './_acct-customer/item-details/item-details.component';
import { CartComponent } from './_acct-customer/cart/cart.component';

const routes: Routes = [
  // site routes without header
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},

  // manager routes
  { path: 'manage', component: ManagerLayoutComponent,
    children: [
      { path: 'home', component: ManagerHomeComponent},

      { path: 'accounts', component: AccountsComponent},
      { path: 'accounts/new', component: AddAccountComponent},
      { path: 'accounts/edit/:id', component: EditAccountComponent},
      
      { path: 'items', component: ItemsComponent},
      { path: 'items/new', component: AddItemComponent},
      { path: 'items/edit/:id', component: EditItemComponent},

      { path: 'lockers', component: LockersComponent},
      { path: 'lockers/new', component: AddLockerComponent},
      { path: 'lockers/edit/:id', component: EditLockerComponent},

      { path: 'reservations', component: ReservationsComponent},
      { path: 'reservations/new', component: AddReservationComponent},
      { path: 'reservations/edit/:id', component: EditReservationComponent},
    ]
  },

  // customer routes
  {
    path: 'customer', component: CustomerLayoutComponent,
    children: [
      { path: 'items', component: ItemListComponent},
      { path: 'items/:id', component: ItemDetailsComponent},
      { path: 'cart', component: CartComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
