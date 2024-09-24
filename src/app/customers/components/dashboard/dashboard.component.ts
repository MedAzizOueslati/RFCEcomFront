import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products : any[]= [];
  constructor(private customerService:CustomerService,
    private snackBar: MatSnackBar, 
    private fb:FormBuilder,
    private router:Router,
    ){}
  
  ngOnInit(): void{
 
    this.getAllProducts();
  }
  
  
  
  getAllProducts(){
    this.products = [];
    this.customerService.getAllProducts().subscribe(res=>{
      res.forEach(element => {
        
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
      this.products.push(element);
      });
    })
  }

  addToCart(id:any){
    this.customerService.addToCart(id).subscribe(
      res=>{
       this.snackBar.open("Product added to cart successfully","Close",{duration:5000})
      }
    )
    
  }

}
