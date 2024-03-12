import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontEcomrfc';

  isClientLoggedIn : boolean = UserStorageService.isClientLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router : Router){}
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();

    })
  }
  logOut(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

}
