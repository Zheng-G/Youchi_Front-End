export class Car {
  _id: string;
  uniqueId: string;
  sellerId: string = '';
  sellerPhone: string = '';
  sellerName: string = '';
  brand: any = {};
  series: any = {};
  carType: any = {};
  carColor: any = {};
  gearshift: string = '';
  productCountry:  any = {};
  fuelOil:  any = {};
  capability:  any = {};
  emissionLevel:  any = {};
  emissionAmount: string = '';
  price: string = '';
  newprice: string = '';
  purchaseDate: string = '';
  marketingStartDate: string = '';
  totalDriven: string = '';
  currentCarPlace: string = '';
  city:  any = {};
  sellerDescription: string = '';
  status: string = '';
  buyphonenumber: string = '';
  buyprice: string = '';
  buydate: string = '';
  carImages: [
    {
      imagePath: string;
    }
  ]; 
  testResult: any = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}