import { Rate } from './../../../model/rate';
import { RatesService } from './../../../services/rater/rates.service';
import { OrdersService } from './../../../services/orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [DatePipe]
})
export class ProductListComponent implements OnInit {
  orderList: any;
  currentOrder: any;
  currentProduct: any;
  currentProductRate: any;
  currentProductStarRate: number = 0;
  currentProductMessageRate: string = '';
  doneOrderList: any[] = [];
  shippingOrderList: any[] = [];
  visible = false;

  fileList: NzUploadFile[] = [];

  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  constructor(
    private message: NzMessageService,
    private ordersService: OrdersService,
    private ratesService: RatesService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    await this.getListOrders();
    this.getOrderListStatus();
  }

  async getListOrders(): Promise<void> {
    var response = await this.ordersService
      .getAllOrdersList('test')
      .toPromise();
    // this.orderList = response.content;
    this.orderList = response; //to test
  }

  async getDetailOrder(id: string) {
    var response = await this.ordersService.getOrderById(id).toPromise();
    // this.currentOrder = response.content;
    this.currentOrder = response; //to test
  }

  async getDetailProduct(orderId: string, productId: string) {
    var response = await this.ordersService.getOrderById(orderId).toPromise();
    // this.currentOrder = response.content;
    this.currentOrder = response; //to test

    this.currentOrder.productList.forEach((product: any) => {
      if (product.productId == productId) {
        this.currentProduct = product;
      }
    });
    this.currentProductRate = null;
    this.currentProductStarRate = 0;
    this.currentProductMessageRate = '';
    this.currentProductRate = await this.getDetailProductRate(
      orderId,
      productId
    );
    if (this.currentProductRate != null) {
      this.currentProductStarRate = this.currentProductRate.starNumbers;
      this.currentProductMessageRate = this.currentProductRate.message;
    }
  }

  async getDetailProductRate(orderId: string, productId: string) {
    var thisDetailVote = null;
    var allRates = await this.ratesService.getAllListRates();
    allRates = allRates.content;
    allRates.forEach((element:any) => {
      if (element.orderId == orderId && element.productId == productId) {
        thisDetailVote = element;
      }
    });
    return thisDetailVote;
  }

  sendProductRate(orderId: string, productId: string) {
    if (this.currentProductStarRate != 0) {
      const newRate: Rate = new Rate(
        orderId,
        productId,
        this.datePipe.transform(new Date(), 'yyyy-MM-dd') || "",
        this.currentProductStarRate,
        this.currentProductMessageRate,
        0
      );
      this.ratesService.sendProductRate(newRate).subscribe((response) => {
        this.createMessage('success', '????nh gi?? ???? ???????c g???i ??i th??nh c??ng');
        console.log('success');
        this.close();
      });
    } else {
      this.createMessage('error', 'Vui l??ng ????nh gi?? s??? sao c???a s???n ph???m');
    }
  }
  // sendProductRate(
  //   orderId: string,
  //   productId: string,
  //   rate: Rate,
  //   fileImg: any
  // ) {
  //   // if (this.currentProductStarRate != 0) {
  //   const newRate: Rate = new Rate(
  //     orderId,
  //     productId,
  //     this.currentProductStarRate,
  //     this.currentProductMessageRate
  //   );
  //   this.ratesService.sendProductRate(newRate).subscribe((response) => {
  //     this.createMessage('success', '????nh gi?? ???? ???????c g???i ??i th??nh c??ng');
  //     console.log('success');
  //     this.close();
  //   });
  //   var formData = new FormData();
  //   formData.append('Files', fileImg[0]);
  //   formData.append('RateStar', 'huy');
  //   this.ratesService.uploadImage(formData).subscribe((response) => {
  //     if (response === true) {
  //       alert('th??nh c??ng');
  //     }
  //   });
  // }

  getOrderListStatus() {
    this.orderList.forEach((order: any) => {
      if (order.status == 'done') {
        this.doneOrderList.push(order);
      } else if (order.status == 'shipping') {
        this.shippingOrderList.push(order);
      }
    });
  }

  getOrderStatusLabel(statusType: string): string {
    var statusLabel;
    switch (statusType) {
      case '???? giao h??ng':
        statusLabel = '???? giao h??ng th??nh c??ng';
        break;
      case '??ang giao h??ng':
        statusLabel = '??ang giao h??ng';
        break;
      default:
        statusLabel = '??ang giao h??ng';
        break;
    }
    return statusLabel;
  }

  async open(orderId: string, productId: string) {
    // await this.getDetailOrder(orderId);
    await this.getDetailProduct(orderId, productId);
    // var rateInfo = await this.getDetailProductRate(orderId, ).toPromise();
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  testFunc() {
    console.log("tsst");
    console.log(this.router);

    // this.router.navigate(['/order-detail']);

  }
}
