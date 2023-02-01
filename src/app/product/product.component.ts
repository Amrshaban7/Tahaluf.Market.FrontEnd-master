import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { PurchaseService } from '../services/purchase.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public product: ProductService, public store: StoreService, public purchase: PurchaseService,private router:Router) { }


  buyQuantity: number = 1;

  ngOnInit(): void {

   
    let sid: any = localStorage.getItem('loadedStoreId');
    this.store.loadStore(sid);

    let id: any = localStorage.getItem('loadedProductId');
    this.product.LoadProduct(id);

    const token = localStorage.getItem('token')
    let user:any = localStorage.getItem('User');
    user = JSON.parse(user);
    let uid: any = user.nameid;
    this.purchase.loadCart(uid);

  }


 /*  loadProductsBySectionIdfirst4(id: number){

    let did: any = localStorage.getItem('loadedStoresection');

    let sid: any = localStorage.getItem('loadedStoreId');
    console.log("sid = " + did)
    console.log("id = " + id)

    this.store.LoadProductsBySectionIdfirst4(+did , +id);
  } */
  



  QntUp(): void {
    
    this.buyQuantity = this.buyQuantity + 1;
  }

  QntDown(): void {
    if(this.buyQuantity>1){
    this.buyQuantity = this.buyQuantity - 1;
   }
  }

  AddToCart(): void {
    this.purchase.AddItemToCart(this.purchase.cart.cartid,this.product.loadedProduct.productId,this.buyQuantity);
  }

  AddItem(CID :any,PID :any,QNT :any){

    this.purchase.AddItemToCart(CID ,PID ,QNT);
    window.location.reload();
  
  }

  loadProduct(id: number){
  
    this.store.LoadStoreSections(id);

    this.product.LoadProduct(id);

    let sid: any = localStorage.getItem('loadedStoreId');
    
    localStorage.setItem('loadedProductId', id.toString());
   
  }

  goToStore(){
    let sid: any = localStorage.getItem('loadedStoreId');
    this.store.loadStore(sid);
    this.router.navigate(["/Store"]);
  }
}
