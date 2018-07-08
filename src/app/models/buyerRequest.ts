export class BuyerRequest {
  _id: string = '';
  userPhone: string = '';
  sellcarUDID: string = '';
  requestType: string = '';
  requestTime: string = '';
  price: string = '';
  requestStatus: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}