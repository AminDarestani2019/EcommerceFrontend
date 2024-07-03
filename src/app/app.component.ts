import { Component, OnInit } from '@angular/core';
import { environment } from '../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BasketService } from './basket/basket.service';
import { IUser } from './shared/model/user';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private basketService:BasketService,private accountService:AccountService){}
  ngOnInit(): void {
    this.getBasket();
    this.getCurrentUser();
  }

  title = 'EduStoreClient';

  private getCurrentUser() {
    const user = <IUser>JSON.parse(localStorage.getItem(environment.keySaveUser));
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }

  private getBasket() {
    const basketId = localStorage.getItem(environment.keyLocalStorageBasket);
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(res => {

      });
    }
  }
}
