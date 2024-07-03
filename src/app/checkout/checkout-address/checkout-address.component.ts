import { Component, OnDestroy, OnInit,Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { IAddress } from '../../shared/model/user';
import { CheckoutFormBuilderService } from '../checkout-form-builder.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddAddressCheckoutComponent } from '../../shared/modals/add-address-checkout/add-address-checkout.component';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})

export class CheckoutAddressComponent implements OnInit,OnDestroy{
  sub$ = new Subscription();
  public addresses : IAddress[]=[];
  public indexAddressShipping = 0;
  constructor(
    private accountService:AccountService, 
    private formBuilder:CheckoutFormBuilderService,
    private bsModalRef : BsModalRef,
    private modalsService:BsModalService){}
  
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(): void {
    this.getAddresses();
    this.formBuilder.formBuilder$.subscribe((res)=>{
    });
  }

  private getAddresses() {
    const sub = this.accountService.getAddresses().subscribe((res: IAddress[]) => {
      this.addresses = res;
      this.indexAddressShipping = res.findIndex((x) => x.isMain);
      this.onChangeAddressShipping(this.indexAddressShipping);
    });
    
    this.sub$.add(this.sub$);
  }
  
  onChangeAddressShipping(index:number){
    const address = this.addresses[index];
    this.indexAddressShipping = index;
    this.formBuilder.setAddress(address);
    
  }
  setToMainAddress(index: number) {
    //refresh isMain
  }
  AddNewAddress(){   
    ;
    const initialState : ModalOptions={
      initialState:{
        //any data you want to pass the model
      }
    };
    
    this.bsModalRef = this.modalsService.show(AddAddressCheckoutComponent,initialState);
    this.bsModalRef.content.newAddress.subscribe((address) => {
      this.checkAddressMain(address);
      this.addresses.push(address);
      this.onChangeAddressShipping(this.addresses.length - 1); //last item
    });
  }

  private checkAddressMain(address: IAddress) {
    if (address.isMain) {
      this.addresses.forEach((element) => {
        if (element.id === address.id) {
          element.isMain = true;
        } else {
          element.isMain = false;
        }
      });
    }
  }
}
