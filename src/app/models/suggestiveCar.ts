export class SuggestiveCar {
  _id: string = '';
  order: string = '';
  chName: string = '';
  startPrice: string = '';
  imageUrl: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}