import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { CardShopComponent } from './components/card-shop/card-shop.component';
//angular material
import { MatSidenavModule } from '@angular/material/sidenav';
//ngx-bootstrap
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { RouterModule } from '@angular/router';
//toast message
import { ToastrModule } from 'ngx-toastr';
import { OrderTotalComponent } from './components/order-total/order-total.component';
import { InputComponent } from './components/input/input.component';
import { MatStepperModule } from "@angular/material/stepper"
import { StepperComponent } from './components/stepper/stepper.component';
import { AddAddressCheckoutComponent } from '././modals/add-address-checkout/add-address-checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardShopComponent,OrderTotalComponent,InputComponent,StepperComponent,AddAddressCheckoutComponent],
  imports: [ CommonModule,ReactiveFormsModule,MatSidenavModule,PaginationModule,RouterModule,MatStepperModule,ToastrModule.forRoot({
    positionClass:'toast-bottom-right',
    preventDuplicates:true,
    progressBar:true,
    progressAnimation:'increasing',
    timeOut:5000
  })],
  exports: [CardShopComponent,MatSidenavModule,PaginationModule,ToastrModule,OrderTotalComponent,InputComponent,StepperComponent,AddAddressCheckoutComponent]
})
export class SharedModule { }
