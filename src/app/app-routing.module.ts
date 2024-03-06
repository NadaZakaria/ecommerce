import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PaymentComponent } from './payment/payment.component';
import { AllordersComponent } from './allorders/allorders.component';
import { CategorydetailsComponent } from './categorydetails/categorydetails.component';
import { WishlistComponent } from './wishlist/wishlist.component';





const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'register', component:RegisterComponent},
  {path:'payment/:id' , component:PaymentComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'login' , component:LoginComponent},
  {path:'home' , canActivate: [authGuard],  component:HomeComponent},
  {path:'brands', canActivate: [authGuard], component:BrandsComponent},
  {path:'products', canActivate: [authGuard], component:ProductsComponent},
  {path:'cart' , canActivate: [authGuard], component:CartComponent},
  {path:'categories' , canActivate: [authGuard], component:CategoriesComponent},
  {path:'productDetails/:id', canActivate: [authGuard], component:ProductDetailsComponent},
  {path:'categoryDetails/:id',canActivate: [authGuard], component:CategorydetailsComponent},
  {path:'settings', loadChildren:()=>import('./settings/settings.module').then((m)=> m.SettingsModule)},
  {path:'**' , component:NotFoundComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
