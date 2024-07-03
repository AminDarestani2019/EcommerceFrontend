import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from './basket.service';
import { IBasket,IBasketItems } from '../shared/model/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  basket$: Observable<IBasket>;
  constructor(private basketService:BasketService){}

  ngOnInit(): void {
    this.basket$=this.basketService.basketItems$;
  }
  increaseItemQuantity(item:IBasketItems){
    this.basketService.increaseItemQuantity(item.id).subscribe();
  }
  decreaseItemQuantity(item:IBasketItems){
    this.basketService.decreaseItemQuantity(item.id).subscribe();
  }
}
