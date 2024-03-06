import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

  brandDetails:any = {}
  brandId:String|null = ''
  allBrands:any[]=[]
  constructor(private _ProductsService:ProductsService , private _ActivatedRoute:ActivatedRoute){}
  ngOnInit():void{
    localStorage.setItem("currentPage", "/brands")

    this._ProductsService.getBrands().subscribe({
      next:(res)=>{
        this.allBrands = res.data
        
      }
    })
  }

  brandAll(brandId:string|null):void{
    this._ActivatedRoute.paramMap.subscribe({
      next: (param)=>{
       this.brandId = param.get('id')
      }
    })

    this._ProductsService.getSpecBrand(brandId).subscribe({
      next:(res)=>{ 
        this.brandDetails = res.data
      },
      error:(err)=>{console.log(err);
      }
    })
  }

}
