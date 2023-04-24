import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  addImage(image : FormData, id : number){
    return this.http.post(this.url+"products/addImage/"+id,image);
  }

  add(data : ProductModel){
    console.log(data);
    return this.http.post(this.url+"products/addProduct",data);
  }

  getAll(){
    return this.http.get(this.url+"products");
  }

  delete_Product(id : number){
    return this.http.delete(this.url+"products/getOne/"+id);
  }

  getProductsByCategory(category : string){
    return this.http.get(this.url+"products/"+category);
  }

  getProductById(productId :number){
    return this.http.get(this.url+"products/getById/"+productId);
  }

  getProductsBySearch(searchString : string){
    return this.http.get(this.url+"products/search/"+searchString);
  }

}
