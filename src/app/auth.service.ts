import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

interface accountDataInterface {
  name?:string,
  email?:string,
  password?:string,
  rePassword?:string,
  phone?:string,
  resetCode?:string,
  newPassword?:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDataVar : BehaviorSubject<any> = new BehaviorSubject(null)

  baseUrl:string="https://ecommerce.routemisr.com"

  constructor( private _HttpClient: HttpClient , private _Router:Router) { 


  this.saveData()



    if(localStorage.getItem("currentPage")){
      
      _Router.navigate([localStorage.getItem("currentPage")])
    }
    else{

    }
   }

  registerApi(rData:accountDataInterface):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, rData)
  }

  loginApi(rData:accountDataInterface):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, rData)
    
  }

  forgetApi(rData:accountDataInterface):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,rData)
  }

  verifyApi(rData:accountDataInterface):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, rData)
  }

  newPassApi(rData:accountDataInterface):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, rData)
  }

  saveData(){
    if(localStorage.getItem("userToken")!= null){

      this.userDataVar.next(localStorage.getItem("userToken"))
      this.userDataVar.next(jwtDecode(this.userDataVar.getValue()))    
    }
    else{
      this.userDataVar.next(null)
    }
  }
}
