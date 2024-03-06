import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './search.pipe';
// Import from library
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { PaymentComponent } from './payment/payment.component';
import { AllordersComponent } from './allorders/allorders.component'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { CategorydetailsComponent } from './categorydetails/categorydetails.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BranddetailsComponent } from './branddetails/branddetails.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    ProductDetailsComponent,
    SearchPipe,
    PaymentComponent,
    AllordersComponent,
    CategorydetailsComponent,
    WishlistComponent,
    BranddetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,RouterModule,BrowserAnimationsModule,CarouselModule, FormsModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
    ,NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:MyhttpInterceptor, multi:true},
  {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
