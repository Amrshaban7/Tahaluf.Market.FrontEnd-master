import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarketService } from '../services/market.service';
import { ProductService } from '../services/product.service';
import { StoreService } from '../services/store.service';
import { TestimonialService } from '../services/testimonial.service';
import { UserdataService } from '../services/userdata.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public product:ProductService,public store:StoreService,public market: MarketService, public testimonial: TestimonialService , public userData:UserdataService , private http: HttpClientModule  , public dialog: MatDialog , private router: Router , private toastr: ToastrService) { }

  ngOnInit(): void {

    this.store.GetRecentProducts();
    this.store.GetBiggestDiscount();
    this.testimonial.GetTestimonialByNumber();
    
  }

  loadMarket(id: number){

    this.market.loadMarket(id);
    localStorage.setItem('loadedMarketId', id.toString());
    this.router.navigate(["Market"]);
  }

  loadProduct(id: number,stid:number){
  
    this.store.LoadStoreSections(id);

    this.product.LoadProduct(id);

    let sid: any = localStorage.getItem('loadedStoreId');

    this.store.loadStore(stid);
    localStorage.setItem('loadedStoreId', stid.toString());

    localStorage.setItem('loadedProductId', id.toString());
    this.router.navigate(["Product"]);
    this.router.navigate(["Product"]);
  }

  loadStore(id: number){

    this.store.loadStore(id);
    localStorage.setItem('loadedStoreId', id.toString());
    this.router.navigate(["Store"]);
    
  }
  
  loadProductAndStore(id: number){
  
    this.store.LoadStoreSections(id);

    this.product.LoadProduct(id);

    let sid: any = localStorage.getItem('loadedStoreId');
    
    localStorage.setItem('loadedProductId', id.toString());

    this.store.loadStore(this.store.biggestDiscountStore.storeId);
    localStorage.setItem('loadedStoreId', this.store.biggestDiscountStore.storeId.toString());

    this.router.navigate(["Product"]);
    this.router.navigate(["Product"]);
  }

}
