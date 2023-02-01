import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketService } from '../services/market.service';
import { StoreService } from '../services/store.service';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor(public store: StoreService,public market: MarketService, private router: Router) { }

  ngOnInit(): void {
    let id: any = localStorage.getItem('loadedMarketId');
    this.market.loadMarket(id);
    this.market.loadMarket(id);
  }

  loadStore(id: number){

    this.store.loadStore(id);
    localStorage.setItem('loadedStoreId', id.toString());
    this.router.navigate(["Store"]);
    
  }

  loadStoresByCategory(id: number){

    let mid: any = localStorage.getItem('loadedMarketId');
    this.market.LoadMarketStoresByCategoryId(+mid , +id);
  }

  loadAll(){
    let id: any = localStorage.getItem('loadedMarketId');
    this.market.loadMarket(id);
  }

}
