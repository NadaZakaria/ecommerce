import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartID :string|null = ""
  constructor(private _ActivatedRoute: ActivatedRoute , private _CartService:CartService ){}

  orderForm:FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  })

  handelForm():void{
    this._CartService.checkOut(this.cartID , this.orderForm.value).subscribe({
      next:(res)=>{
        if(res.status == "success"){
          window.open(res.session.url, "_self")
        }
      }
    })

  }
  ngOnInit(): void {
    localStorage.setItem("currentPage", "/payment")

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartID = params.get('id')
      }
    })
  }
}
