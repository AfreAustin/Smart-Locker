import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManagerHeaderComponent } from './_layouts/manager-header/manager-header.component';
import { ManagerLayoutComponent } from './_layouts/manager-layout/manager-layout.component';
import { CustomerLayoutComponent } from './_layouts/customer-layout/customer-layout.component';
import { CustomerHeaderComponent } from './_layouts/customer-header/customer-header.component';

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

import { AccountFormComponent } from './_forms/account-form/account-form.component';
import { ItemFormComponent } from './_forms/item-form/item-form.component';
import { LockerFormComponent } from './_forms/locker-form/locker-form.component';
import { ReservationFormComponent } from './_forms/reservation-form/reservation-form.component';

import { ItemListComponent } from './_acct-customer/item-list/item-list.component';
import { ItemDetailsComponent } from './_acct-customer/item-details/item-details.component';
import { CartComponent } from './_acct-customer/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerHeaderComponent,
    ManagerLayoutComponent,
    CustomerLayoutComponent,
    CustomerHeaderComponent,

    AccountsComponent,
    AddAccountComponent,
    EditAccountComponent,
    ItemsComponent,
    AddItemComponent,
    EditItemComponent,
    LockersComponent,
    AddLockerComponent,
    EditLockerComponent,
    ReservationsComponent,
    AddReservationComponent,
    EditReservationComponent,
    ManagerHomeComponent,

    AccountFormComponent,
    ItemFormComponent,
    LockerFormComponent,
    ReservationFormComponent,

    ItemListComponent,
    ItemDetailsComponent,
    CartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
