import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  inputValue : string =""

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
  allProducts:Product[]=[]
  wishListData:string[]=[]
  categories:any[]=[]
  constructor(private _ProductsService:ProductsService ,
     private _CartService:CartService, 
     private toastEvokeService: ToastEvokeService,
     private _Renderer2:Renderer2,
     private _WishlistService :WishlistService
     ){}

  ngOnInit():void{
    localStorage.setItem("currentPage", "/home")

    this._ProductsService.getProductsAPI().subscribe({
      next: (res)=>{
        this.allProducts = res.data
      }
    })

    this._WishlistService.getWishList().subscribe({
      next:(res)=>
      {
        const newData = res.data.map((item:any)=> item._id)
        this.wishListData = newData
      }
    })

    this._ProductsService.getCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        
        this.categories = res.data
      }
    })
  }


  addFav(prodId:string):void{
    this._WishlistService.addToWishList(prodId).subscribe({
      next:(res)=>
      {
        this.toastEvokeService.success('sucess', res.message).subscribe();
        this.wishListData = res.data
      }

    })

  }

  removeFav(prodId:string):void{
    this._WishlistService.removeItemWishlist(prodId).subscribe({
      next:(res)=>
      {
        this.toastEvokeService.success('sucess', res.message).subscribe();
        this.wishListData = res.data
      }
    })

  }

  addCartBtn(pId:string){
    this._CartService.addToCartAPI(pId).subscribe({
      next: (res)=>{
        // Type SUCCESS
        this.toastEvokeService.success('sucess', res.message).subscribe();

        this._CartService.cartNum.next(res.numOfCartItems)
      },
      error: (err)=>{console.log(err)}
    })
  }
}
