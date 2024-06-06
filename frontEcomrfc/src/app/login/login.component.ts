import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm! : FormGroup;
  hidePassword = true;

  constructor( 
    private fb: FormBuilder,
    private snackBar : MatSnackBar,
    private authService: AuthService,
    private router: Router){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      email:[null,[Validators.required,]],
      password:[null,[Validators.required]],
    })}
    togglePasswordVisibility(){
      this.hidePassword = !this.hidePassword;
    }
  
    onSubmit(): void {
      const username = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
    
      this.authService.login(username,password).subscribe(
        (res) => {
        if (UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        }
        else if (UserStorageService.isClientLoggedIn()){
          this.snackBar.open('Login Success ', 'Ok', { duration: 5000 });
          this.router.navigateByUrl('customers/dashboard');
        
        }
        error => {
          this.snackBar.open('Bad credentials', 'ERROR', {
            duration: 5000,
            panelClass: 'error-this.snackBar'
          });
        }
        
      }
        );
    
    }

}
