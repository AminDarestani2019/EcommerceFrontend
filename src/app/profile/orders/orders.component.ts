import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOrder } from '../../shared/model/order';
import { ProfileService } from '../profile.service';
import { BsModalService ,BsModalRef,ModalOptions} from 'ngx-bootstrap/modal';
import { OrderDetailComponent } from '../../shared/modals/order-detail/order-detail.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit,OnDestroy{
  private sub = new Subscription();
  orders: IOrder[]=[];

  //modal
  bsModalRef: BsModalRef<any>;

  constructor(private profileService: ProfileService,private modalService:BsModalService){}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getOrdersForCurrentUser();
  }

  getOrdersForCurrentUser(){
    const sub$ = this.profileService.getOrdersForClient().subscribe((res)=>{
      this.orders = res;
    });
    this.sub.add(sub$);
  }

  showOrder(orderId:number){
    const childOrder = this.orders.find((x)=>x.id == orderId);
    //open modal
    const initial:ModalOptions = {
      class:'modal-lg',
      initialState:{
        order:childOrder
      }
    };
    this.bsModalRef = this.modalService.show(OrderDetailComponent,initial);
  }
}
