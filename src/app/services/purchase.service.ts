import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }


  cart: any;

  cartId: any;

  cartTotal: any = 0;

  cartTotalAfterSales: any = 0;

  promoCode: any = "";


  async loadCart(id: number){
    this.cartId = id;
    this.LoadCart(id);
  }

  LoadCart(id: any){
    this.cart= {};

    this.cartId = 0;

    this.cartTotal = 0;

    this.cartTotalAfterSales = 0;

    this.promoCode= "";

    this.http.get("https://localhost:44366/api/Cart/GetCartByUserId/"+id).subscribe(

      (result)=>{
        this.cart = result;
        this.cartId = this.cart.cartid;
        if(this.cart.promoCodeId !== null) this.promoCode = this.cart.promocode;
        this.cartTotal = 0;
        this.cart.cartItems.forEach((obj:any) => {this.cartTotal += obj.sum;});
        
        this.cartTotalAfterSales = this.cartTotal;

      if(this.cart.promoDiscount != 0 && this.cart.promoDiscount != null){
      this.cartTotalAfterSales = this.cartTotalAfterSales - (this.cartTotal *(this.cart.promoDiscount / 100  ))}
      if(this.cart.currentDiscount != 0 && this.cart.currentDiscount != null){
      this.cartTotalAfterSales = this.cartTotalAfterSales - (this.cartTotal *(this.cart.currentDiscount / 100  ))}

      localStorage.setItem('CartTotal', this.cartTotalAfterSales);

      },
      err => {
        this.toastr.error(err.message);
      })
    
  }

  AddItemToCart(CID :any,PID :any,QNT :any){

    let body = {
      CartId: CID,
      ProductId: PID,
      ItemQuantity: QNT
    }

    this.http.post('https://localhost:44366/api/Cart/AddItemToCart/', body).subscribe(
    (res)=>{
      this.toastr.success("Product Added to Cart!");
    },
    err => {
      this.toastr.error(err.message);  
    })

  }


  RemoveItemFromCart(CID :any,PID :any){

    let body = {
      CartId: CID,
      ProductId: PID,
    }

    this.http.post('https://localhost:44366/api/Cart/RemoveItemFromCart/', body).subscribe(
    (res)=>{
      this.toastr.success("Item Removed form Cart!");

    },
    err => {
      this.toastr.error(err.message);  
    })

  }

  DeleteItemFromCart(CID :any,PID :any){

    let body = {
      CartId: CID,
      ProductId: PID
    }

    this.http.post('https://localhost:44366/api/Cart/DeleteItemFromCart/', body).subscribe(
    (res)=>{
      this.toastr.success("Items Deleted from Cart!");

    },
    err => {
      this.toastr.error(err.message);  
    })

  }

  ClearCart(CID :any){

    let body = {
      CartId: CID,
    }
    this.http.post("https://localhost:44366/api/Cart/ClearCart/", body).subscribe(
    (res)=>{
      this.toastr.success("Cart Cleared!");
    },
    err => {
      this.toastr.error(err.message);  
    })
  }

  AddPromoCode(CID :any, PCODE :any){

    let body = {
      CartId: CID,
      PromoCode: PCODE
    }
    this.promoCode = PCODE;
    this.http.post("https://localhost:44366/api/Cart/AddPromoCode/", body).subscribe(
    (res)=>{
      if(res == true){
      this.toastr.success("Promo Code Added!");
      window.location.reload();
    }
    else
    this.toastr.warning("Promo Code Is Invalid Or Expired!");
    },
    err => {
      this.toastr.error(err.message); 
    })
  }


  PurchaseCartByUserId(UID: Number){

    let body: Number = UID;
    this.http.post('https://localhost:44366/api/Cart/PurchaseCartByUserId/'+UID, body).subscribe(
    (res)=>{
      

      this.http.post('https://localhost:44366/api/Order/SendEmailForLasrOrder/'+UID,body).subscribe(
      (result)=>{
        
        this.toastr.success("Order Placed!");  
      },
      error => {
        this.toastr.error(error.message);  
      })

      this.toastr.success("Order Placed!");  
    },
    err => {
      this.toastr.error(err.message);  
    })

  }



}
