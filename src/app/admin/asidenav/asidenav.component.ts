import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-asidenav',
  templateUrl: './asidenav.component.html',
  styleUrls: ['./asidenav.component.css']
})
export class AsidenavComponent implements OnInit {

  constructor( public order: OrdersService , public auth: AuthService , private router: Router , private http: HttpClientModule ) { }

  ngOnInit(): void {


    var body:any = {};
    this.order.GetCountsOrders(body);

    let user:any = localStorage.getItem('User');
      user = JSON.parse(user);
      let idd: number = +user.nameid;

      console.log("here" + idd);
      this.auth.SetUserDataById(idd);
  }


  LogOut(){
    localStorage.clear();
     this.router.navigate(["Account/Login"]); 
  }


  Dash(){
    this.router.navigate(["Admin/"]);
  }
  Markets(){
    this.router.navigate(["Admin/Market"]);
  }
  Users(){
    this.router.navigate(["Admin/Users"]);
  }
  Orders(){
    this.router.navigate(["Admin/Order"]);
  }
  PromoCode(){
    this.router.navigate(["Admin/Promo"]);
  }
  Testimonial(){
    this.router.navigate(["Admin/Testimonial"]);
  }
  ContactUs(){
    this.router.navigate(["Admin/ContactUs"]);
  }
  profile(){
    this.router.navigate(["Admin/Account"]);
  }
  Website(){
    this.router.navigate(["Admin/Website"]);
  }





}
