import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../model/order';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  order: IOrder;
  constructor(public bsModalRef: BsModalRef){}
  
  ngOnInit(): void {
    console.log(this.order);
    
  }
}
