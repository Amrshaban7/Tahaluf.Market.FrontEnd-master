import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketMapService } from '../services/market-map.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {

  constructor(private router:Router,public marketmap:MarketMapService) { 

  }
  searchBar = new FormControl('')

  ngOnInit(): void {
    
  }
  searchMarket(){
    localStorage.setItem('marketSearch', this.searchBar.value);
    this.router.navigate(["/Map"])
  }

}
