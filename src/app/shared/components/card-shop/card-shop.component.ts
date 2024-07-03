import { Component, OnInit,Input } from '@angular/core';
import { IProduct } from '../../model/product';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrl: './card-shop.component.scss'
})
export class CardShopComponent implements OnInit{
  @Input() product:IProduct;
  constructor(private basketService:BasketService){}
  ngOnInit(): void {}
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product).subscribe((res)=>{

    });
  }
}
