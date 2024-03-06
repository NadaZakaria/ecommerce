import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit{

  allProducts :Product[]=[]
  pageSize:number =0 //limit
  currentPage:number = 0
  totalItems:number =0
  inputValue : string =""
  constructor(private _ProductsService:ProductsService , private _CartService:CartService , private toastEvokeService:ToastEvokeService){}

  ngOnInit(): void {

    localStorage.setItem("currentPage", "/products")
    this._ProductsService.getProductsAPI().subscribe({
      next: (res)=>{
        this.allProducts = res.data
        this.pageSize = res.metadata.limit
        this.currentPage = res.metadata.currentPage
        this.totalItems = res.results
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

  pageChanged(event:any):void{
    this._ProductsService.getProductsAPI(event).subscribe({
      next: (res)=>{
        this.allProducts = res.data
        this.pageSize = res.metadata.limit
        this.currentPage = res.metadata.currentPage
        this.totalItems = res.results
      }
    })
  }
}
