import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../../shared/model/basket';
import { AccountService } from '../../../account/account.service';
import { IUser } from '../../../shared/model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  basket$ : Observable<IBasket>;
  currentUser$: Observable<IUser>;
  constructor(private basketService: BasketService,private accountService:AccountService){}
  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
    this.currentUser$ = this.accountService.currentUser$;
  }
  logout(){
    this.accountService.logout();
  }
}
