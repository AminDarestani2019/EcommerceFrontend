import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  @ViewChild('appStepper') stepper:any;
  constructor(){}
  ngOnInit(): void {
    
  }
}
