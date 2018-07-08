export class TestCategory {
  _id: string = '';
  testCategory: string = '';
  categoryItems: [
    {
      testItemName: string;
      checked: boolean;
    }
  ];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}