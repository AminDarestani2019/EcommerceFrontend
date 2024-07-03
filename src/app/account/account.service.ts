import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser,Login,Register } from '../shared/model/user';
import { HttpClient } from '@angular/common/http';
import { _isNumberValue } from '@angular/cdk/coercion';
import { IShipToAddress,IAddress } from '../shared/model/address';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.backendUrl;
  private currentUser = new BehaviorSubject<IUser>(null);//next
  public currentUser$ = this.currentUser.asObservable();//sub
  constructor(private http: HttpClient,private router:Router) { }

  login(login:Login):Observable<IUser>{
    return this.http.post<IUser>(`${this.baseUrl}/account/login`,login).pipe(
      map((response):IUser=>{
        if(response)
          {
            this.setCurrentUser(response);
            return response;
          }
          return null;
      })
    );
  }

  getAddresses(){
    return this.http.get<IAddress[]>(`${this.baseUrl}/account/GetAddresses`);
  }

  addAddress(address:IShipToAddress):Observable<IAddress>{
    return this.http.post<IAddress>(`${this.baseUrl}/account/createAddress`,address);
  }

  register(register:Register){
    return this.http.post<IUser>(`${this.baseUrl}/account/register`,register).pipe(
      map((response:IUser)=>{
        if(response){
          this.setCurrentUser(response);
          return response;
        }
        return null;
      })
    );
  }

  logout(){
    localStorage.removeItem(environment.keySaveUser);
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  setCurrentUser(user:IUser){
    if(user){
      localStorage.setItem(environment.keySaveUser,JSON.stringify(user));
      this.currentUser.next(user);
    }
  }
}
