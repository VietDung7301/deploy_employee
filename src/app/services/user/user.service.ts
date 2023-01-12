import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://api-admin-dype.onrender.com';
  constructor(private http: HttpClient) {}

  // Đăng nhập vào hệ thống, tên đăng nhập mặc định như phía dưới
  // Mục đích: Để lấy access_token từ module quản lý người dùng và lưu vào localStorage
  login() {
    const url = `${this.baseUrl}/api/login`;
    const body = {
      email: "admin@ltct.com",
      password: "123456"
    };
    const response = this.http.post<any>(url, body)
      .subscribe(data => {
        console.log('data', data)
        localStorage.setItem('access_token', data.access_token);
      })
  }

  getUserInfor(id: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    console.log('headers', headers);
    return this.http.get<any[]>(`${this.baseUrl}/api/user/${id}`, {headers: headers});
  }
}
