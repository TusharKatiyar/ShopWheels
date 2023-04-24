import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/services/utils.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent {


  product: ProductModel={id:0,name:"",description:"",price:0,category:"", subcategory:[], image: ""};
  buyProductModel: ProductModel={id:0,name:"",description:"",price:0,category:"", subcategory:[], image: ""};
  productId: number = 0;

  inCart: boolean = false;

  userId: string = "";

  cartModel: any[];
  constructor(private activatedRoute: ActivatedRoute, private productService : ProductService, private route: Router, private sanitizer: DomSanitizer, private cartService: CartService, private ordersService: OrdersService) { }
    

  ngOnInit(){

    this.productId = this.activatedRoute.snapshot.params['productId'];
    console.log(this.productId);
    this.inCart=false;

    this.productService.getProductById(this.productId).subscribe(
      (data: any) => {
        this.buyProductModel = data;
        let objectURL = 'data:image/png;base64,' + data.image;
        data.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.product = data;
        console.log(this.product);
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  buyProduct(){
    this.productService.getProductById(this.productId).subscribe(
      (data: any) => {
        this.buyProductModel = data;
        this.cartModel=[{
          "quantity": 1,
          "product": this.buyProductModel,
        }];
        console.log(this.cartModel);
      this.userId = JSON.parse(localStorage.getItem('token')!).id;
      this.ordersService.addOrder(this.userId,this.cartModel).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
        
      }, (error: any) => {
        console.log(error);
      }
    );
   
    
  }

  addToCart(userId: any,productId: number){
    this.userId = JSON.parse(localStorage.getItem('token')!).id;
    console.log(this.userId);
    console.log(productId);
    this.cartService.addCart(this.userId,productId).subscribe(
      (data: any) => {
        console.log(data);
        this.inCart = true;
      }
    );
  }

  goToCart(){
    this.route.navigate(['/cart']);
  }
}

  
