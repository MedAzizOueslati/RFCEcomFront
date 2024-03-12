import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from './storage/user-storage.service';

const BASIC_URL = "http://localhost:8089/api/"


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

/*
addCategory(Category:any): Observable<any>{
  return this.http.post(BASIC_URL + 'admin/category', categoryDto {
    headers:createAutorizationHeader()
  }) 
}*/
private createAutorizationHeader() : HttpHeaders{
  return new HttpHeaders().set(
    'Authorization','Bearer'+ UserStorageService.getToken()
  )
}
}