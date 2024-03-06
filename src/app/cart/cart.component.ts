import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
cartItem: any = null
  constructor(private _CartService:CartService, private _Renderer2:Renderer2){}
  ngOnInit():void{
    localStorage.setItem("currentPage", "/cart")

    this._CartService.getAllCartItemAPI().subscribe({
      next: (res)=>{
        this.cartItem = res.data
      },
      error: (err)=>{console.log(err);
      }
    })
  }

  removeItem(id:string , btn:HTMLButtonElement):void{

    this._Renderer2.setAttribute(btn, 'disabled' ,'true')
    this._CartService.removeCartItemAPI(id).subscribe({
      next: (res)=>{console.log(res)
        this.cartItem = res.data
        this._Renderer2.removeAttribute(btn, 'disabled')

        this._CartService.cartNum.next(res.numOfCartItems)
      },
      error: (err)=>{console.log(err);
        this._Renderer2.removeAttribute(btn, 'disabled')
      }
      

    })
  }

  changeCount(count:number , id:string , el1:HTMLButtonElement , el2:HTMLButtonElement):void{
    this._Renderer2.setAttribute(el1, 'disabled', 'true')
    this._Renderer2.setAttribute(el2, 'disabled', 'true')

    if(count>= 1){
      this._CartService.updateCartItemAPI(id,count).subscribe({
        next: (res)=>{
          this.cartItem = res.data 
          this._Renderer2.removeAttribute(el1, 'disabled', 'true')
          this._Renderer2.removeAttribute(el2, 'disabled', 'true')
        }
      })
    }

    

  }

  clear():void{
    this._CartService.clearCartAPI().subscribe({
      next: (res)=>{
        if(res.message=== "success"){
          this.cartItem = null     
          this._CartService.cartNum.next(0)  
         }
      }
    })
  }
}
