export class Area {
  _id: string = '';
  chName: string = '';
  chPinyin: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}