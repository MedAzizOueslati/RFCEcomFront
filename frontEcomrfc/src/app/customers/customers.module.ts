import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterailModule } from '../DemoAngularMaterialModule';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { ReviewComponent } from './components/review/review.component';


@NgModule({
  declarations: [
    CustomersComponent,
    DashboardComponent,
    CartComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    ViewOrderComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterailModule
  ]
})
export class CustomersModule { }
