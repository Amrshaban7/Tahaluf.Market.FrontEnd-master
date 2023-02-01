import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account/account.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { MarketManageComponent } from './market-manage/market-manage.component';
import { StoreManageComponent } from './store-manage/store-manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestimonialManageComponent } from './testimonial-manage/testimonial-manage.component';
import { ContactManageComponent } from './contact-manage/contact-manage.component';
import { PromocodeManageComponent } from './promocode-manage/promocode-manage.component';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { WebsiteManageComponent } from './website-manage/website-manage.component';

const routes: Routes = [
  {
    path: 'Users',
    component:UserManageComponent
  },
  {
    path: 'Account',
    component:AccountComponent
  },
  {
  path: 'Products',
  component: ProductManageComponent
  },
  {
    path: 'Market',
    component: MarketManageComponent
  },
  {
    path: 'Stores',
    component: StoreManageComponent
  },
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'Testimonial',
    component: TestimonialManageComponent
  },
  {
    path: 'ContactUs',
    component: ContactManageComponent
  },
  {
    path: 'Promo',
    component: PromocodeManageComponent
  },
  {
    path: 'Order',
    component: OrderManageComponent
  },
  {
    path: 'Website',
    component: WebsiteManageComponent
  },
  

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
