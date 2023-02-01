import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManageComponent } from './user-manage/user-manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { AuthService } from '../services/auth.service';
import { MarketManageComponent } from './market-manage/market-manage.component';
import { AsidenavComponent } from './asidenav/asidenav.component';
import { FooternavComponent } from './footernav/footernav.component';
import { StoreManageComponent } from './store-manage/store-manage.component';
import { TestimonialManageComponent } from './testimonial-manage/testimonial-manage.component';
import { ContactManageComponent } from './contact-manage/contact-manage.component';
import { PromocodeManageComponent } from './promocode-manage/promocode-manage.component';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { WebsiteManageComponent } from './website-manage/website-manage.component';


@NgModule({
  declarations: [
    UserManageComponent,
    DashboardComponent,
    AccountComponent,
    ProductManageComponent,
    MarketManageComponent,
    AsidenavComponent,
    FooternavComponent,
    StoreManageComponent,
    TestimonialManageComponent,
    ContactManageComponent,
    PromocodeManageComponent,
    OrderManageComponent,
    WebsiteManageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    
  ]
})
export class AdminModule { }
