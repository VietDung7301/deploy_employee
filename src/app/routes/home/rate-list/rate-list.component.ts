import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductsService } from 'src/app/services/products/products.service';
import { RatesService } from 'src/app/services/rater/rates.service';
import { RateDetailDrawerComponent } from './partials/rate-detail-drawer/rate-detail-drawer.component';

enum RateStatus {
  NotYet = 0,
  RequestSolve = 1,
  RequestHide = 2,
}

interface ProductRate {
  id: string;
  postDate: string;
  productId: string;
  productName: string;
  productImageUrl: string;
  message: string;
  starNumbers: number;
  userName: string;
  status: RateStatus;
}

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.css'],
})
export class RateListComponent implements OnInit {
  @ViewChild('rateDetailDrawer') rateDetailDrawer!: RateDetailDrawerComponent;
  listOfData: ProductRate[] = [];
  listAllProduct: any[] = [];
  editingRate: any;
  RateStatus = RateStatus;
  constructor(
    private ratesService: RatesService,
    private productsService: ProductsService,
    private modal: NzModalService
  ) {}

  listOfFilterStar = [
    { text: '1 sao', value: 1 },
    { text: '2 sao', value: 2 },
    { text: '3 sao', value: 3 },
    { text: '4 sao', value: 4 },
    { text: '5 sao', value: 5 },
  ];
  filterFnStar = (list: string[], item: any) =>
    list.some((starNumbers) => item.starNumbers == starNumbers);

  sortFnStar = (a: any, b: any): number => a.starNumbers - b.starNumbers;

  listOfFilterStatus = [
    { text: 'Chưa xử lý', value: RateStatus.NotYet },
    { text: 'Đã yêu cầu giải quyết', value: RateStatus.RequestSolve },
    { text: 'Đã yêu cầu ẩn comment', value: RateStatus.RequestHide },
  ];
  filterFnStatus = (list: string[], item: any) =>
    list.some((status) => item.status == status);

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData() {
    var response = await this.ratesService.getAllListRates();
    console.log('response', response);
    // this.listOfData = response.content;
    this.listOfData = response; //to test
    var productResponse = await this.productsService
      .getAllProductsList()
      .toPromise();
    // this.listAllProduct = productResponse.content;
    this.listAllProduct = productResponse; //to test
    this.listOfData.forEach((rate, index) => {
      var product = this.listAllProduct.find(
        (product) => product.id == rate.productId
      );
      this.listOfData[index] = {
        ...rate,
        productName: product.name,
        productImageUrl: product.imageUrl,
      };
    });
    this.listOfData = [...this.listOfData];
  }

  openDrawer(data: ProductRate) {
    this.rateDetailDrawer.openDrawer(data);
  }

  isVisibleHideCommentModal: boolean = false;
  isVisibleSolveCommentModal: boolean = false;
  showHideCommentModal(data: any) {
    this.isVisibleHideCommentModal = true;
    this.editingRate = data;
  }
  showSolveCommentModal(data: any) {
    this.isVisibleSolveCommentModal = true;
    this.editingRate = data;
  }
  // handleOk(): void {
  //   console.log('Button ok clicked!');
  //   this.isVisibleHideCommentModal = false;
  // }

  handleCancel(): void {
    this.isVisibleHideCommentModal = false;
    this.isVisibleSolveCommentModal = false;
  }

  sendHideCommentRequest() {
    var data = { ...this.editingRate, status: 2 };
    this.ratesService
      .updateProductRate(data.id, data)
      .toPromise()
      .then((result) => {
        this.isVisibleHideCommentModal = false;
        this.fetchData();
      });
  }

  async sendSolveCommentRequest() {
    var data = { ...this.editingRate, status: 1 };
    await this.ratesService
      .updateProductRate(data.id, data)
      .toPromise()
      .then((result) => {
        this.isVisibleSolveCommentModal = false;
        this.fetchData();
      });
  }

  async sendCancelRequest(data: any) {
    this.editingRate = data;
    var data = { ...this.editingRate, status: 0 };
    await this.ratesService
      .updateProductRate(data.id, data)
      .toPromise()
      .then((result) => {
        this.fetchData();
      });
  }
}
