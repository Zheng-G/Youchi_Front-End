export class CarType {
  type: [
    {
      _id: string;
      logo: string;
      chName: string;
      chPinyin: string;
    }
  ];
  color: [
    {
      _id: string;
      colorName: string;
      colorRGB: string;
    }
  ];
  gearshift: [
    {
      _id: string;
      gearshiftName: string;
    }
  ];
  productCountry: [
    {
      _id: string;
      countryName: string;
    }
  ];
  fuelOil: [
    {
      _id: string;
      oilName: string;
    }
  ];
  capability: [
    {
      _id: string;
      capability: string;
    }
  ];
  emission: [
    {
      _id: string;
      emissionLevel: string;
    }
  ];


  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}