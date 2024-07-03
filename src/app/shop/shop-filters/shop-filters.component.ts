import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBrand } from '../../shared/model/brand';
import { IType } from '../../shared/model/type';
import { ShopService } from '../shop.service';
import { ShopParams } from '../../shared/model/shopParams';
import { __values } from 'tslib';

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrl: './shop-filters.component.scss'
})
export class ShopFiltersComponent implements OnInit{
  @Output() updateParams=new EventEmitter<boolean>();

  public brands: IBrand[];
  public types: IType[];
  public shopParams:ShopParams;
  sortOptions=[
    {key:1,title:'عنوان'},
    {key:2,title:'نوع محصول'},
    {key:3,title:'قیمت'}
  ]

  sortTypeOptions=[
    { key:1, title:'زیاد به کم'},
    { key:2, title:'کم به زیاد'}
  ]
  constructor(private shopService:ShopService){}

  onChangTypes(typeId:number){
    this.shopParams.typeId = typeId;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
  }
  onChangeBrands(brandId:number){
    this.shopParams.brandId = brandId;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
  }

  onChangeSort(sort:number){
    this.shopParams.sort = sort;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
  }

  onChangeSortType(sortType:number){
    this.shopParams.typeSort = sortType;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
  }
  private getTypes()
  {
    this.shopService.getTypes().subscribe((res)=>{
      this.types = res;
    });
  }

  private getBrands()
  {
    this.shopService.getBrands().subscribe((res)=>{
      this.brands=res;
    });
  }

  ngOnInit():void{
    this.shopParams = this.shopService.getShopParams();
    this.getBrands();
    this.getTypes();
  }
}
