import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Product } from '../product';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService:WishlistService, private toastEvokeService:ToastEvokeService,
    private _CartService:CartService){}

  allProducts:Product[]=[]
  wishListData:string[]=[]
  ngOnInit(): void {
    localStorage.setItem("currentPage", "/wishlist")
    this._WishlistService.getWishList().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.allProducts = res.data

        const newData = res.data.map((item:any)=> item._id)
        this.wishListData = newData
        
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

        // this._WishlistService.getWishList().subscribe({
        //   next:(res)=>{
        //     this.allProducts = res.data
        //   }
        // })

        const newprodData = this.allProducts.filter((item)=>
          this.wishListData.includes(item._id)
        )
        this.allProducts = newprodData
       
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
