import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService { 

cartNum: BehaviorSubject<number> = new BehaviorSubject(0)


baseUrl:string="https://ecommerce.routemisr.com"
  constructor(private _HttpClient:HttpClient) { }


  addToCartAPI(pId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,{productId:pId})
  }

  getAllCartItemAPI():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`)
  }

  removeCartItemAPI(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${pId}`)

  }


  updateCartItemAPI(pId:string, pCount:number):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${pId}`,{count :pCount} )
  }

  clearCartAPI():Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`)

  }

  checkOut(cartId:string|null , orderinfo : object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      "shippingAddress":orderinfo
    })
  }
}
