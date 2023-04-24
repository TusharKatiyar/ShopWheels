import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getCart(userId : any){
    return this.http.get(this.url+"cart/"+userId+"/getCart");
  }  

  addCart(userId : any, productId : number){
    return this.http.get(this.url+"cart/"+userId+"/add/"+productId);
  }

  incrementQuantity(userId : any, productId : number){
    return this.http.get(this.url+"cart/"+userId+"/increment/"+productId);
  }

  decrementQuantity(userId : any, productId : number){
    return this.http.get(this.url+"cart/"+userId+"/decrement/"+productId);
  }

  remove(userId : any, productId : number){
    return this.http.delete(this.url+"cart/"+userId+"/remove/"+productId);
  }

  addOrder(userId : any, data: any){
    return this.http.post(this.url+"order/"+userId+"/createOrder",data);
  }
}
