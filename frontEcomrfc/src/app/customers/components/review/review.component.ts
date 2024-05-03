import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  productId:number = this.activatedroute.snapshot.params["productId"];
  reviewForm!:FormGroup;
  selectedFile:File | null;
  imagePreview: string | ArrayBuffer | null;
  
  constructor(private activatedroute : ActivatedRoute ,
    private customerService:CustomerService,
    private router:Router,
    private snackBar:MatSnackBar,
    private fb:FormBuilder){

  }
  ngOnInit(){
    this.reviewForm = this.fb.group({
      rating: [null,[Validators.required]],
      description: [null,[Validators.required]],
  })
}
onFileSelected(event:any){
  this.selectedFile = event.target.files[0];
  this.previewImage();
}

previewImage(){
  const reader = new FileReader();
  reader.onload = ()=>{
    this.imagePreview = reader.result;
  }
  reader.readAsDataURL(this.selectedFile);
}

submitForm(){
  const formData:FormData = new FormData();
  formData.append('img', this.selectedFile)
  formData.append('productId', this.productId.toString());
  formData.append('userId', UserStorageService.getUserId().toString());
  formData.append('rating', this.reviewForm.get('rating').value);
  formData.append('description',this.reviewForm.get('description').value);

  this.customerService.giveReview(formData).subscribe(res=>{
    if(res.id != null){
      this.snackBar.open('Review Posted Successfully!', 'Close',{
        duration: 5000
      });
      this.router.navigateByUrl('/customers/my_orders')
    } else{
      this.snackBar.open("Something went wrong", "ERROR",{
        duration: 5000
      });
    }
  }

  )
}

}


