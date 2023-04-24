import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressModel, UserLoginModel, UserModel } from './utils.service';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any={};

  private  url = "http://localhost:8080/";


  constructor(private http : HttpClient) { }

  login(data : UserLoginModel){
    return this.http.post(this.url+"login",data);
  }

  signup(data : UserModel){
    return this.http.post(this.url+"signup",data);
  }

  getUser(userId: String){
    return this.http.get(this.url+"getprofile/"+userId);
  }

  updateUser(userId: String, data: UserModel){
    this.user={
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      id: userId
    }
    return this.http.post(this.url+"updateProfile",data);
  }

  updateAddress(userId : String, data : AddressModel){
    return this.http.post(this.url+userId+"/addAddress",data);
  }

  resetPassword(data : any){
    return this.http.post(this.url+"resetPassword",data);
  }
}
