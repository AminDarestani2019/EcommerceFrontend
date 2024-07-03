import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAddress,ICheckoutFormBuilder } from '../shared/model/user';
import { IDeliveryMethod } from '../shared/model/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormBuilderService {
  private formBuilder = new BehaviorSubject<ICheckoutFormBuilder>(null);
  public formBuilder$ = this.formBuilder.asObservable();
  constructor() { }
  setAddress(address:IAddress){
    this.formBuilder.next({...this.formBuilder.value,address});
  }
  setDeliveryMethod(deliveryMethod:IDeliveryMethod){
    this.formBuilder.next({...this.formBuilder.value,deliveryMethod })
  }
  setPortalType(portalType:number)
  {
    this.formBuilder.next({...this.formBuilder.value,portalType});
  }
}