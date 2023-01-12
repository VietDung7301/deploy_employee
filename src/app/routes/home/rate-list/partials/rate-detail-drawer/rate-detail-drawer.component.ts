import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-detail-drawer',
  templateUrl: './rate-detail-drawer.component.html',
  styleUrls: ['./rate-detail-drawer.component.css']
})
export class RateDetailDrawerComponent implements OnInit {
  visible = false;
  data: any;

  openDrawer(data:any): void {
    this.visible = true;
    this.data = {...data};
    console.log(this.data);

  }

  close(): void {
    this.visible = false;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
