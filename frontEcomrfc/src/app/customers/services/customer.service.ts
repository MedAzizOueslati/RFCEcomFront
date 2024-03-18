import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8089/api/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get(BASIC_URL + 'customer/products',{
      headers: this.createAuthorizationHeader(),
    })
  }
  getAllProductsByName(name:any):Observable<any>{
    return this.http.get(BASIC_URL + `customer/search/${name}`,{
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader() : HttpHeaders {
    return new HttpHeaders().set(
      'Authorization' , 'Bearer' + UserStorageService.getToken()
    )
  }
}
