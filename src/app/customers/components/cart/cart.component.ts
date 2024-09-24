import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: any[] = [];
  order: any;
  constructor(private customerService:CustomerService,
    private snackBar: MatSnackBar, 
    private fb:FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    ){}

    ngOnInit(): void{
 
      this.getcart();
    }
    

    getcart(){
      this.cartItems = [];
      this.customerService.getCartByUserId().subscribe(res =>{
        this.order = res;
        res.cartItems.forEach(element =>{
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element);

        });
      }

      )
    }
    increaseQuantity(productId:any){
      this.customerService.increaseQuantity(productId).subscribe(res =>
        this.snackBar.open('Product quantity increased.' , 'Close' , {duration:5000}));
        this.getcart();
    }
    decreaseQuantity(productId:any){
      this.customerService.decreaseQuantity(productId).subscribe(res =>
        this.snackBar.open('Product quantity decreased.' , 'Close' , {duration:5000}));
        this.getcart();
    }
    placeOrder(){
      this.dialog.open(PlaceOrderComponent);
    }
}
