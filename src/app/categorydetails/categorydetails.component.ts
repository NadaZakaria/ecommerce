import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent  implements OnInit{

  categoryDetails:any = {}
  categoryId:String|null = ''
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService){}
  ngOnInit(): void {
  
    this._ActivatedRoute.paramMap.subscribe({
      next: (param)=>{
       this.categoryId = param.get('id')
      }
    })

    this._ProductsService.getSpecCtagory(this.categoryId).subscribe({
      next:(res)=>{
        this.categoryDetails = res.data
      }
    })
  }
}
