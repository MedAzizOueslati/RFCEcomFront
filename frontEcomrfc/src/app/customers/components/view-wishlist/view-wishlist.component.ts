import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss']
})
export class ViewWishlistComponent {

  products: any[] = [];

  
  constructor(private activatedroute : ActivatedRoute ,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    ){}

    ngOnInit(){
      this.getWishlistByUserId();
    }

    getWishlistByUserId() {
      this.customerService.getWishlistByUserId().subscribe(res => {
        res.forEach(element => {
    
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.products.push(element);
        })

        });
      };
    }
  



