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
  addToCart(productId:any):Observable<any>{
    const cartDto = {
      productId : productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'customer/cart',cartDto,{
      headers: this.createAuthorizationHeader(),
    })
  }
  increaseQuantity(productId:any):Observable<any>{
    const cartDto = {
      productId : productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'customer/addition',cartDto,{
      headers: this.createAuthorizationHeader(),
    })
  }
  decreaseQuantity(productId:any):Observable<any>{
    const cartDto = {
      productId : productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'customer/decrease',cartDto,{
      headers: this.createAuthorizationHeader(),
    })
  }

  getCartByUserId():Observable<any>{
    const userId = UserStorageService.getUserId()
    
    return this.http.get(BASIC_URL + `customer/cart/${userId}`,{
      headers: this.createAuthorizationHeader(),
    })
  }

  placeOrder(orderDto: any): Observable<any> {
    orderDto.userId = UserStorageService.getUserId();
    
    // Assuming createAuthorizationHeader() returns HttpHeaders
    const headers = this.createAuthorizationHeader();
  
    // Send the orderDto as the request body and provide headers separately
    return this.http.post(BASIC_URL + 'customer/placeOrder', orderDto, { headers });
  }

  getOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    
    // Assuming createAuthorizationHeader() returns HttpHeaders
    const headers = this.createAuthorizationHeader();
  
    // Send the orderDto as the request body and provide headers separately
    return this.http.get(BASIC_URL + `customer/myOrders/${userId}`,  { headers });
  }
  getOrderedProducts(orderId:number): Observable<any> {

    // Send the orderDto as the request body and provide headers separately
    return this.http.get(BASIC_URL + `customer/ordered-products/${orderId}`,  {
       headers : this.createAuthorizationHeader() ,
      });
  }

  giveReview(reviewDto:any): Observable<any> {

    
      
      // Assuming createAuthorizationHeader() returns HttpHeaders
      const headers = this.createAuthorizationHeader();
    
      // Send the orderDto as the request body and provide headers separately
      return this.http.post(BASIC_URL + 'customer/review', reviewDto, { headers });
  
  }

  getProductDetailById(productId: number): Observable<any> {

    // Send the orderDto as the request body and provide headers separately
    return this.http.get(BASIC_URL + `customer/product/${productId}`,  {
       headers : this.createAuthorizationHeader() ,
      });
  }

  addProductToWishlist(wishlistDto:any): Observable<any> {

    
      
    // Assuming createAuthorizationHeader() returns HttpHeaders
    const headers = this.createAuthorizationHeader();
  
    // Send the orderDto as the request body and provide headers separately
    return this.http.post(BASIC_URL + 'customer/wishlist', wishlistDto, { headers });

}
getWishlistByUserId(): Observable<any> {

    const userId = UserStorageService.getUserId();

      
  // Assuming createAuthorizationHeader() returns HttpHeaders
  const headers = this.createAuthorizationHeader();

  // Send the orderDto as the request body and provide headers separately
  return this.http.get(BASIC_URL + `customer/wishlist/${userId}`,  { headers });

}

  
  private createAuthorizationHeader() : HttpHeaders {
    return new HttpHeaders().set(
      'Authorization' , 'Bearer' + UserStorageService.getToken()
    )
  }
}
