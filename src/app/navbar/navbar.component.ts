import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('navBar') navElement!: ElementRef

  @HostListener("window:scroll")
  onScroll():void{
    if(scrollY >300){
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow')
    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow')
    }
    
  }

  cartNumber:number = 0
  isLogin:boolean = false

  constructor(private _AuthService:AuthService, private _Router:Router , private _CartService:CartService , private _Renderer2 :Renderer2){}

  ngOnInit(): void {
   this._CartService.cartNum.subscribe({
    next:(res)=>{
     this.cartNumber = res
      
    }
   })

   this._CartService.getAllCartItemAPI().subscribe({
    next: (res)=>{
      this.cartNumber = res.numOfCartItems
    }
   })

    this._AuthService.userDataVar.subscribe(()=>{
      if(this._AuthService.userDataVar.getValue() == null){
        this.isLogin = false

      }
      else{
        this.isLogin = true
      }
    })

  }


  logout(){
    localStorage.removeItem("userToken")
    this._AuthService.saveData()
    this._Router.navigate(['/login'])
  }

}
