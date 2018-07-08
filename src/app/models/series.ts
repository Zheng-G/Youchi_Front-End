export class Series {
  logo: string = '';
  chName: string = '';
  chPinyin: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}