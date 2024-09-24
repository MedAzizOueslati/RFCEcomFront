import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products : any[]= [];
  constructor(private adminService:AdminService,
    private snackBar: MatSnackBar, 
    private fb:FormBuilder,
    private router:Router,
    ){}
  
  ngOnInit(): void{
 
    this.getAllProducts();
  }
  
  
  
  getAllProducts(){
    this.products = [];
    this.adminService.getAllProducts().subscribe(res=>{
      res.forEach(element => {
        
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
      this.products.push(element);
      });
    })
  }
  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe(
      (res: any) => {
        if (res && res.status === 200) {
          this.snackBar.open('Failed to delete product', 'Close', {
            duration: 5000
          });
          this.getAllProducts();
        } else {
          this.snackBar.open('Product Deleted Successfully', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      },
      (error: any) => {
        console.error('Error deleting product:', error);
        this.snackBar.open('An error occurred while deleting product', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    );
    window.location.reload();

  }

}
