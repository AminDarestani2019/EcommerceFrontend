import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}
  
  public getOrdersForClient(){
    return this.http.get<any>(`${this.backendUrl}/order/getOrdersForUser`)
   }
}
