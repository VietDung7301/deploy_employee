export class Rate {
  orderId: string;
  productId: string;
  postDate: string;
  starNumbers: number;
  message: string;
  status: number;
  userName: string;

  constructor(
    orderId: string,
    productId: string,
    postDate: string,
    starNumbers: number,
    message: string,
    status: number
  ) {
    this.orderId = orderId;
    this.productId = productId;
    this.starNumbers = starNumbers;
    this.message = message;
    this.postDate = postDate;
    this.status = status;
    this.userName = "Toan blackpink"
  }
}
