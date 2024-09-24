import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { elementAt } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent {
  
  productId: number = this.activatedroute.snapshot.params["productId"];
  product: any;
  reviews: any[] = [];

  
  constructor(private activatedroute : ActivatedRoute ,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    ){}

    ngOnInit(){
      this.getProductDetailById();
    }

    getProductDetailById() {
      this.customerService.getProductDetailById(this.productId).subscribe(res => {
        console.log('Product Data:', res.productDto);
        console.log('Review Data:', res.reviewDtoList);
    
        this.product = res.productDto;
       // this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;
        this.product.processedImg = 'data:image/png;base64,' + res.productDto.byteImg;

    
        res.reviewDtoList.forEach(element => {
          console.log('Review Element:', element);
          element.processedImg = 'data:image/png;base64,' + element.reImg;
          this.reviews.push(element);
        });
      });
    }
    addTowishlist(){
      const wishlistDto = {
        productId : this.productId,
        userId: UserStorageService.getUserId()
      }
      this.customerService.addProductToWishlist(wishlistDto).subscribe(res =>{
        if(res.id != null){
            this.snackBar.open('Product Added to Wishlist Successfuly!', 'Close',{
              duration: 5000
            } );
        } else{
          this.snackBar.open("Already in Wishlist",'ERROR',{
            duration: 5000
          
          });
        }
        
      })
    }

}
