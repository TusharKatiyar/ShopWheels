import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent {

  userId: string = "";
  displayedColumns: string[] = ['checked', 'Street', 'City', 'State', 'Pincode'];

  orderId: string = "";
  tableList: any[]=[];
  dataSource = new MatTableDataSource<any>(this.tableList);
  addressId: string = "";

  constructor(private loginService: LoginService, private ordersService: OrdersService, private activatedRoute: ActivatedRoute, private router: Router) {  }


  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['orderId'];
    console.log(this.orderId);

    if (localStorage.getItem('token') !== null) {
      this.userId = JSON.parse(localStorage.getItem('token')!).id;
      this.loginService.getAddress(this.userId).subscribe(
        (data: any) => {
          console.log(data);
          // this.cartList = data;
          for(let i in data){
            this.tableList[i]={
              checked: false,
              addressId: data[i].addressId,
              street: data[i].street,
              city: data[i].city,
              state: data[i].state,
              pincode: data[i].pincode
            }           
          }
          console.log(this.tableList);
          this.dataSource = new MatTableDataSource<any>(this.tableList);
          console.log(this.dataSource);

        }
      );
    }
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.tableList);
  }

  
  selectAddress(){

    this.addressId = this.dataSource.filteredData.find(x=>x.checked).addressId;
    console.log(this.dataSource.filteredData);
    console.log(this.addressId);
    

    this.loginService.selectAddress(this.orderId, this.addressId).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/orders']);
      },
      (error) => {
        console.log(error);
      }
    );
    // this.buyList=[];
    // this.dataSource.filteredData.forEach(x=>{
    //   if(x.checked){
    //     this.buyList.push({
    //       quantity: x.quantity,
    //       product: x.product
    //     })
    //   }
    // })
  }
}
