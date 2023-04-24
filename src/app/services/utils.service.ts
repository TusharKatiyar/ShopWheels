import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 
}

export interface UserModel{
  name : string;
  email : string;
  password : string;
  phone : number;
}

export interface UserLoginModel{
  email : string;
  password : string;
}

export interface ProductModel{
  id: number;
  name : string;
  description : string;
  price : number;
  category : string;
  subcategory : string[];
  image : string;
}

export interface Category {
  value: string;
  viewValue: string;
}

export interface subcategory {
  value: string;
  viewValue: string;
}

export interface AddressModel{
  street: string;
  city: string;
  state: string;
  pincode: number;
}

export enum RoleModel{
  User='User',
  Admin='Admin'
}

export interface UserTokenModel{
  id: string;
  email: string;
  role: RoleModel;
  token: string;
}