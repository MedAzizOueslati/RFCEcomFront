import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  myOrders:any;

  constructor(private customerService:CustomerService,private snackBar:MatSnackBar){

  }
  ngOnInit(): void{
 
    this.getMydOrders();
  }

  getMydOrders(){
    this.customerService.getOrdersByUserId().subscribe(res=>{
      this.myOrders = res;
    })
  }

}
