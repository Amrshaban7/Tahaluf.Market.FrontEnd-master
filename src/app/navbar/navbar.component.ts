import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';
import { StoreService } from '../services/store.service';
import { WebsitedataService } from '../services/websitedata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public websitedata:WebsitedataService,public purchase:PurchaseService,public store:StoreService, private router: Router) { }

  searchBar = new FormControl('')

  searchMarket(event: KeyboardEvent){
    if(event.key === 'Enter'){
    localStorage.setItem('marketSearch', this.searchBar.value);
    this.router.navigate(["/Map"])
  }

  }

  userType:any=""
  userToken:any={}
  ngOnInit(): void {
    this.websitedata.GetWebsiteData();
    this.userToken = localStorage.getItem('token');
    let user:any = localStorage.getItem('User');

    this.userType = JSON.parse(user);

    if(this.userToken){
    user = JSON.parse(user);
    let id: any = user.nameid;
    this.purchase.loadCart(id);
  }
  
  }

  DeleteItemFromCart(CID :any,PID :any){

    this.purchase.DeleteItemFromCart(CID ,PID);
    window.location.reload();
  }
  
/* 
  GoToCheckOut(){
    localStorage.setItem('CartTotal', this.purchase.cartTotalAfterSales);
    this.router.navigate(["Checkout"]);
    this.router.navigate(["Checkout"]);
  } 
*/

  LogOut(){
    localStorage.clear();
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
      this.router.navigate(['Dashboard'])
     });;
  }

  GoToCheckOut(){
    localStorage.setItem('CartTotal', this.purchase.cartTotalAfterSales);
    this.router.navigate(['Checkout'])
    .then(() => {
      window.location.reload();
    });}

    GoToLogin(){
      this.router.navigate(['/Account/Login']);
    }  
}
