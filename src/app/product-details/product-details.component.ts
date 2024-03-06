import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    },
    nav: true
  }
  
  oneProduct!: Product
  pId:string =""
  constructor(private _ActivatedRoute:ActivatedRoute,
     private _ProductsService:ProductsService,
     private _CartService:CartService,
     private toastEvokeService: ToastEvokeService,
     ){}

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/product-details")

    this._ActivatedRoute.params.subscribe((p)=>{
      this.pId = p["id"]

      this._ProductsService.getSpecProdAPI(this.pId).subscribe({
        next: (res)=>{
          this.oneProduct = res.data
        }
      })
      
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
