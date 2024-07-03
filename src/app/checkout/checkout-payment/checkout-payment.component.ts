import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ToastrService } from 'ngx-toastr';
import { CheckoutFormBuilderService } from '../checkout-form-builder.service';
import { PortalTypeEnum } from '../../shared/model/checkout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements OnInit{
  PortalType = PortalTypeEnum;
  portalSelected = 3;
  transferToPortal = false;
  constructor(private orderService:OrderService,private toastr:ToastrService,private router:Router,private formBuilder:CheckoutFormBuilderService){}
  ngOnInit(): void {
    this.formBuilder.setPortalType(this.portalSelected);
  }
  createOrder(){
    this.transferToPortal = true;
    this.orderService.createOrder().subscribe((res)=>{
      if(res){
        console.log(res);
        if(res.authority){
          window.location.href = res.link;
        }else {
          this.transferToPortal=false;
          this.router.navigateByUrl('/checkout/success?status=failed');
        }
        // console.log(res);     
        // this.toastr.success('پرداخت با موفقیت انجام شد');
      }
    });
  }
  onChangePortal(portalType:number)
  {
    this.portalSelected = portalType;
    this.formBuilder.setPortalType(portalType);
  }
}
