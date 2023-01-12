## Cách thêm mới 1 trang:
Thực hiện với ví dụ tạo 1 trang helloworld
### 1. Viết mã nguồn trang
Tạo mới 3 file `helloworld.component.html`, `helloworld.component.ts`, `helloworld.component.css`

Thêm code vào file `helloworld.component.html`
```shell
<h1>hello world</h1>
```
### 2. Tạo component
Thêm code vào file 'helloworld.component.ts`
```shell
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './helloworld.component.html',
  styleUrls: ['./helloworld.component.css']
})
export class HelloWorldComponent implements OnInit{
  constructor() { }
  ngOnInit(): void {
  }
}
```
### 3. Import component vừa tạo
Import component vừa tạo vào `Client\src\app\app-routing.module.ts` và `Client\src\app\app.module.ts`
