export class Brand {
  _id: string = '';
  logo: string = '';
  chName: string = '';
  enName: string = '';
  chPinyin: string = '';
  series: [
    {
      logo: string;
      chName: string;
      chPinyin: string;
    }
  ];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}