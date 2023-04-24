import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  addOrder(userId : any, data: any){
    return this.http.post(this.url+"order/"+userId+"/createOrder",data);
  }

  getOrders(userId : any){
    return this.http.get(this.url+"order/"+userId+"/getOrders");
  }
}
