import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FinderComponent } from './finder/finder.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MarketComponent } from './market/market.component';
import { AuthModule } from './auth/auth.module';
import { AdminAuthGuard } from './admin-auth.guard';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MapComponent } from './map/map.component';
import { EmptyProductGuard } from './empty-product.guard';
import { EmptyStoreGuard } from './empty-store.guard';
import { EmptyOrderGuard } from './empty-order.guard';
import { UserOnlyGuard } from './user-only.guard';
import { EmptyMarketGuard } from './empty-market.guard';


const routes: Routes = [
  {
    path: 'contactus',
    component: ContactusComponent
  },
  {
    path:'',
    component: HomepageComponent
  },
  {
    path:'aboutus',
    component: AboutusComponent
  },
  {
    path:'Market',
    component: MarketComponent,
    canActivate: [EmptyMarketGuard]
   
  },
  {
    path:'Home', 
    component: HomepageComponent
    
  },
  {
    path:'Cart', 
    component: CartComponent,
    canActivate: [UserOnlyGuard]
    
  },

  {
    path:'Dashboard', 
    component: UserDashboardComponent,
    canActivate: [UserOnlyGuard]
    
  },
  
  {
    path:'OrderDetails', 
    component: OrderDetailsComponent,
    canActivate: [EmptyOrderGuard,UserOnlyGuard]
    
  },
  {
    path:'Checkout', 
    component: CheckoutComponent,
    canActivate: [UserOnlyGuard]
  },
  {
    path:'Success', 
    component: CheckoutSuccessComponent,
    canActivate: [UserOnlyGuard]
  },
  {
    path:'Store', 
    component: StoreComponent,
    canActivate: [EmptyStoreGuard]
  },
  {
    path:'Product', 
    component: ProductComponent,
    canActivate: [EmptyProductGuard]
  },
  {
  path:'Finder',
  component: FinderComponent
  },
  {
    path:'Map',
    component: MapComponent
    },
  
{
  path: 'Admin',
  loadChildren: () => AdminModule,
  canActivate: [AdminAuthGuard]
},

{
  path: 'Account',
  loadChildren: () => AuthModule
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
