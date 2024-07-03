import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotal } from '../../model/basket';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.scss'
})
export class OrderTotalComponent implements OnInit {
  basketTotal$:Observable<IBasketTotal>;
  constructor(private basketService:BasketService){}
  ngOnInit(): void {
    this.basketTotal$ = this.basketService.totalBasket$;
  }
}
