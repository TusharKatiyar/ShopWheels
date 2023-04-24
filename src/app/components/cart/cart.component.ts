import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  userId: string = "";
  displayedColumns: string[] = ['checked','Id', 'Product Name', 'Price', 'Quantity', 'Remove'];

  cartList: any[] = [];
  tableList: any[]=[];
  dataSource = new MatTableDataSource<any>(this.tableList);
  buyList: any[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.userId = JSON.parse(localStorage.getItem('token')!).id;
      this.cartService.getCart(this.userId).subscribe(
        (data: any) => {
          console.log(data);
          // this.cartList = data;
          for(let i in data){
            this.tableList[i]={
              checked: false,
              id: data[i].id,
              quantity: data[i].quantity,
              product: data[i].product
            }           
          }
          console.log(this.tableList);
          this.dataSource = new MatTableDataSource<any>(this.tableList);
          console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;

        }
      );
    }
    
    this.dataSource.paginator = this.paginator;

  }

  increment(userId:any,cartId: number){
    this.userId = JSON.parse(localStorage.getItem('token')!).id;
    this.cartService.incrementQuantity(this.userId, cartId).subscribe(
      (data: any) => {
        console.log(data);
        this.ngOnInit();
      }
    );
  }

  decrement(userId:any,cartId: number){
    this.userId = JSON.parse(localStorage.getItem('token')!).id;
    this.cartService.decrementQuantity(this.userId, cartId).subscribe(
      (data: any) => {
        console.log(data);
        this.ngOnInit();
      }
    );
  }


  removeFromCart(userId: any, productId: number) {
    this.userId = JSON.parse(localStorage.getItem('token')!).id;
    this.cartService.remove(this.userId, productId).subscribe(
      (data: any) => {
        console.log(data);
        window.location.reload();
        // this.router.routeReuseStrategy.shouldReuseRoute = function(){
        //   return false;
        // }
        //   this.router.navigate(["/cart"]);
      }
    );
  }

  buyProducts() { 
    this.buyList=[];
    this.dataSource.filteredData.forEach(x=>{
      if(x.checked){
        this.buyList.push({
          quantity: x.quantity,
          product: x.product
        })
      }
    })
    console.log(this.buyList);
    
    this.userId = JSON.parse(localStorage.getItem('token')!).id;
    this.cartService.addOrder(this.userId,this.buyList).subscribe(
      (data: any) => {
        console.log(data); 
        for(let i in this.buyList){
          console.log(this.buyList[i].id);
          this.removeFromCart(this.userId,this.buyList[i].product.id);
        }
        // window.location.reload();
     }
    );
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.tableList);
    this.dataSource.paginator = this.paginator;
}
}