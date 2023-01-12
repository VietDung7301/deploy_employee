import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = `${environment.apiURL}/products-list`;
  constructor(private http: HttpClient) {}

  getAllProductsList() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getProductById(productId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${productId}`);
  }
}
