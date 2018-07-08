export class FEED {
  _id: string = '';
  phoneNumber: string = '';
  date: string = '';
  feedback: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}