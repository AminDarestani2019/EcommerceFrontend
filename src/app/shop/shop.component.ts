import { Component, HostListener,ElementRef, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Subscription } from 'rxjs';
import { Ipagination } from '../shared/model/pagination';
import { IProduct } from '../shared/model/product';
import { ShopParams } from '../shared/model/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit,OnDestroy{
  private sub$ = new Subscription();
  //get data
  public data : Ipagination<IProduct>;
  //get shopParams
  shopParams:ShopParams;
  //configure sidenav
  sidenavOpen : boolean = true;
  //search box
  @ViewChild('search',{static:false}) searchTerm:ElementRef;
  constructor (private shopService:ShopService){}

  ngOnInit(): void {
    this.onWindowResize();
    this.getProducts();
    this.shopParams = this.shopService.getShopParams();
  }

  onPageChange(data:any){
    this.shopParams.pageIndex = data.page;
    this.shopService.updateShopParams(this.shopParams);
    this.getProducts();
  }
  onReset(){
    this.shopParams = new ShopParams();
    this.shopService.updateShopParams(this.shopParams);
    this.searchTerm.nativeElement.value='';
    this.getProducts();
  }
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopService.updateShopParams(this.shopParams);
    this.getProducts();
  }
  @HostListener('window:resize')
  public onWindowResize(){
    window.innerWidth<960 ? (this.sidenavOpen=false):(this.sidenavOpen=true);
  }

  private getProducts() {
    const sub$ = this.shopService.getProducts().subscribe((res) => {
      this.data = res;
    });
    this.sub$.add(sub$);
  }

  updateParams(updated:boolean){
    if(updated){
      this.getProducts();
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
