import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FinderComponent } from './finder/finder.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MarketComponent } from './market/market.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule, HTTP_INTERCEPTORS, JsonpInterceptor}from '@angular/common/http';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { StoreComponent } from './store/store.component';
import { StoreService } from './services/store.service';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component'
import { TokenInterceptor } from 'src/Interceptor/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    ContactusComponent,
    AboutusComponent,
    MarketComponent,
    FinderComponent,
    StoreComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    CheckoutSuccessComponent,
    UserDashboardComponent,
    OrderDetailsComponent,
    MapComponent

    
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule,
    ToastNoAnimationModule.forRoot(),
    GoogleMapsModule
    //test
  ],
  exports:[
    NavbarComponent,
    FooterComponent
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
