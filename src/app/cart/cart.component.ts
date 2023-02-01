import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public purchase: PurchaseService,public store:StoreService, private router: Router) { }


  PromoCode =  new FormControl('', [Validators.required]);

  
  ngOnInit(): void {

    const token = localStorage.getItem('token')
    let user:any = localStorage.getItem('User');
    user = JSON.parse(user);
    let id: any = user.nameid;
    this.purchase.loadCart(id);

  }

  
AddItemToCart(CID :any,PID :any,QNT :any){

  this.purchase.AddItemToCart(CID ,PID ,QNT);
  window.location.reload();

}

RemoveItemFromCart(CID :any,PID :any){

  this.purchase.RemoveItemFromCart(CID ,PID);
  window.location.reload();

}

DeleteItemFromCart(CID :any,PID :any){

  this.purchase.DeleteItemFromCart(CID ,PID);
  window.location.reload();
}

ClearCart(CID :any){

  this.purchase.ClearCart(CID);
  window.location.reload();

}

ContinueShopping(){
  
  this.store.loadStore(this.purchase.cart.storeId);
  localStorage.setItem('loadedStoreId', this.purchase.cart.storeId.toString());
  this.router.navigate(["Store"]);
  
}

UpdateCart(){

  window.location.reload();

}

GoToCheckOut(){
  localStorage.setItem('CartTotal', this.purchase.cartTotalAfterSales);
  this.router.navigate(['Checkout'])
  .then(() => {
    window.location.reload();
  });}

ApplyPromoCode(){
  this.purchase.AddPromoCode(this.purchase.cart.cartid,this.PromoCode.value);
}

}
