import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDeliveryMethod, IOrder, IOrderRequest } from '../shared/model/order';
import { IAddress } from '../shared/model/address';
import { BasketService } from '../basket/basket.service';
import { CheckoutFormBuilderService } from './checkout-form-builder.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private backendUrl = environment.backendUrl;
  constructor(private http:HttpClient,private basketService:BasketService,private formBuilder:CheckoutFormBuilderService) { }
  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(`${this.backendUrl}/order/getDeliveryMethods`);
  } 

  createOrder(){
    //base
    let address: IAddress;
    let deliveryMethod: IDeliveryMethod;
    let basketId: string;
    let portalType: number=3;
    //fill the base
    this.basketService.basketItems$.subscribe((res)=>{
      basketId = res?.id;
    });
    
    this.formBuilder.formBuilder$.subscribe((res)=>{
      (address=res.address),(deliveryMethod = res.deliveryMethod),(portalType=res.portalType);
    });

    const order : IOrderRequest = {
      basketId: basketId,
      buyerPhoneNumber:address.number,
      deliveryMethodId: deliveryMethod?.id,
      shipToAddress:address,
      portalType:portalType
    };   
    
    return this.http.post<IOrder>(`${this.backendUrl}/order/createOrder`,order).pipe(
      tap((res)=>{
        if(res)this.basketService.clearLocalBasket();          
      })
    );
  }
}
