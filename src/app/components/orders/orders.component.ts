import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  userId: string = "";
  displayedColumns: string[] = ['Product Name', 'Quantity', 'Total Price', 'Order Status'];

  orderList: any[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.userId = JSON.parse(localStorage.getItem('token')!).id;
      this.ordersService.getOrders(this.userId).subscribe(
        (data: any) => {
          console.log(data);
          this.orderList = data;
        }
      );
    }
  }
}
