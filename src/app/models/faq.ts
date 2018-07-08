export class FAQ {
  _id: string = '';
  chQuestion: string = '';
  chAnswer: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}