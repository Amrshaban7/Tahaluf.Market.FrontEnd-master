import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(public orders: OrdersService, private router: Router) { }

  ngOnInit(): void {
    let id: any = localStorage.getItem('loadedOrderId');
    this.orders.loadOrderDetails(id);

  }

  print(): void {
    window.print()
}

}
