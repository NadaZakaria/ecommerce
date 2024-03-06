import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryData:any[]=[]
  constructor(private _ProductsService:ProductsService){}
  ngOnInit():void{
    localStorage.setItem("currentPage", "/categories")

     this._ProductsService.getCategories().subscribe({
      next:(res)=>{
        this.categoryData = res.data
      }
     })
  }

}
