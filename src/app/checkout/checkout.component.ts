import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { StoreService } from '../services/store.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public toastr:ToastrService,public purchase: PurchaseService,public store:StoreService, private router: Router) { 

    this.totalfinal = localStorage.getItem('CartTotal');

    render(
      {
          id: "#paymentButtons",
          currency: "USD",
          value:this.totalfinal,
          onApprove: (details) => {
              const token = localStorage.getItem('token')
              let user:any = localStorage.getItem('User');
              user = JSON.parse(user);
              let id: any = user.nameid;
              this.purchase.PurchaseCartByUserId(id);
              this.router.navigate(["Success"]);
             
          }
        }
      );

  }


  totalfinal: any = 0;
  

   ngOnInit(): void{

    const token = localStorage.getItem('token')
    let user:any = localStorage.getItem('User');
    user = JSON.parse(user);
    let id: any = user.nameid;
    this.purchase.loadCart(id);

  }

}
