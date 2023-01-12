import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css', './fonts/themify-icons-font/themify-icons.css']
})
export class RequestComponent implements OnInit{
  userInfor: any;
  userId: any;
  inputUserName: any;
  
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId = params['uid'];
    });
    this.fetchData();
    this.initForm();
  }

  async fetchData() {
    // Đăng nhập vào module user để lấy token
    await this.login();
    await this.getUserInfor();
  }

  async login(): Promise<void> {
    const response = await this.userService.login()
  }
  async getUserInfor(): Promise<void> {
    const response = await this.userService
      .getUserInfor(this.userId)
      .toPromise();
    this.userInfor = response;
  }

  initForm() {
    console.log('userId', this.userId);
  }
}