import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = `${environment.apiURL}/orders-list`;
  constructor(private http: HttpClient) {}

  getAllOrdersList(userId: string) {
    return this.http.get<any[]>(this.baseUrl);
  }

  getOrderById(id: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`);
  }
}
