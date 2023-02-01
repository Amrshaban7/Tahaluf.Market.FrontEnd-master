import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { StoreService } from '../services/store.service';
//import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class StoreComponent implements OnInit {

  constructor(public store: StoreService, public product: ProductService, private router: Router) { }

  ngOnInit(): void {
    let id: any = localStorage.getItem('loadedStoreId');
    this.store.loadStore(id);
  }

  
  loadProduct(id: number){
  
    this.store.LoadStoreSections(id);

    this.product.LoadProduct(id);

    let sid: any = localStorage.getItem('loadedStoreId');
    
    localStorage.setItem('loadedProductId', id.toString());
    this.router.navigate(["Product"]);
    this.router.navigate(["Product"]);
  }

  
  loadProductsBySectionId(id: number){
    let sid: any = localStorage.getItem('loadedStoreId');
    this.store.loadStoreProductsBySectionId(+sid , +id);
  }


  loadAll(){
    let id: any = localStorage.getItem('loadedStoreId');
    this.store.loadStore(id);
  }

}
