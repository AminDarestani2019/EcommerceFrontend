import { Component, OnInit } from '@angular/core';
import { IDeliveryMethod } from '../../shared/model/order';
import { OrderService } from '../order.service';
import { CheckoutFormBuilderService } from '../checkout-form-builder.service';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit {
  deliveryMethods:IDeliveryMethod[] = [];
  indexSelected=0;
  constructor(private orderService:OrderService,private formBuilder:CheckoutFormBuilderService,private basketService:BasketService){}

  ngOnInit(): void {
    this.getDeliveryMethods();
  }
  private getDeliveryMethods(){
    this.orderService.getDeliveryMethods().subscribe((res)=>{
      this.deliveryMethods=res;
      this.basketService.setShippingPrice(this.deliveryMethods[0].price);
      this.setDeliveryMethod(this.indexSelected);
    });
  }
  onChangeDelivery(index:number){
    this.indexSelected = index;
    this.setDeliveryMethod(index);
    this.basketService.setShippingPrice(this.deliveryMethods[index].price);
    this.formBuilder.formBuilder$.subscribe(res=>{
    });
  }

  private setDeliveryMethod(index: number) {
    this.formBuilder.setDeliveryMethod(this.deliveryMethods[index]);
  }
}
