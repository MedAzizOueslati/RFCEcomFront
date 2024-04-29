import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { ReviewComponent } from './components/review/review.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my_orders', component: MyOrdersComponent },
  { path: 'ordered_products/:orderId', component: ViewOrderComponent },
  { path: 'review/:productId', component: ReviewComponent },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
