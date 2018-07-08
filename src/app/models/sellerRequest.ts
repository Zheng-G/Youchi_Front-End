export class SellerRequest {
  _id: string = '';
  userPhone: string = '';
  sellcarBrand: string = '';
  sellcarSeries: string = '';
  purchaseDate: string = '';
  marketingStartDate: string = '';
  totalDriven: string = '';
  buyphonenumber:string = '';
  currentCarPlace: string = '';
  requestTime: string = '';
  requestStatus: string = '';
  price: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}