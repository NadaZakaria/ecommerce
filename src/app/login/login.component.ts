import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  forgetFlag:boolean =true
  verifyFlag:boolean =false
  newPassFlag:boolean =false

  errorMassage!:string
  sentMsg!:string
  isLoading : boolean = false

  constructor(private _AuthService:AuthService , private _Router:Router){}

  loginForm : FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required , Validators.email]),
    password: new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z].{6}/)]),

  })


  // form one forget
  forgetForm:FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required , Validators.email])
  })

  //form two verify
  verifyForm:FormGroup = new FormGroup({

    resetCode: new FormControl(null, [Validators.required])
  })

  //form three reset password
  newPassForm:FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required , Validators.email]),
    newPassword: new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z].{6}/)]),

  })

  newPassMethod(){
    this.isLoading = true

    this._AuthService.newPassApi(this.newPassForm.value).subscribe({
      next: (res) =>{console.log(res)
        this.isLoading = false

        if(res.token){
          
        }
 
      },
      error: (err)=>{console.log(err);
      }

    })
  }

  verifyMethod(){
    this.isLoading = true

    this._AuthService.verifyApi(this.verifyForm.value).subscribe({
      next: (res) =>{console.log(res)
        this.isLoading = false

        if(res.status == "Success"){
          this.verifyFlag = false
          this.newPassFlag = true
          
        }
 
      },
      error: (err)=>{console.log(err);
      }

    })
  }

  forgetMethod(){
    this.isLoading = true

    this._AuthService.forgetApi(this.forgetForm.value).subscribe({
      next: (res) =>{console.log(res)
        this.isLoading = false
        if(res.message){
          this.forgetFlag = false
          this.verifyFlag = true
          
        }
 
      },

    })
  }

  loginSubmit(){

    this.isLoading = true

    this._AuthService.loginApi(this.loginForm.value).subscribe({
      next: (res) =>{console.log(res)
        this.isLoading = false

        if(res.message =="success"){
          localStorage.setItem("userToken" , res.token);

          this._AuthService.saveData()
          this._Router.navigate(['/home'])
        }
 
      },

      error: (err)=>{
        this.errorMassage = err.error.message
        
        this.isLoading = false
      }
      
    })
  }
}
