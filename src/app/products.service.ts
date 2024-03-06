import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl:string="https://ecommerce.routemisr.com"

  constructor(private _HttpClient:HttpClient) { }

  getCategories():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories `)
  }

  getSpecCtagory(id:String|null):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${id}`)
  }

  getProductsAPI(pageNum:number = 1):Observable<any>{

   return this._HttpClient.get(`${this.baseUrl}/api/v1/products?page=${[pageNum]}`)
  }

  getSpecProdAPI(_id:string):Observable<any>{

    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${_id}`)
   }


   getBrands():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`)
   }

   getSpecBrand(id:String|null):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands/${id}`)
   }
}
