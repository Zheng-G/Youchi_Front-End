export class User {
  _id:string;
  phoneNumber: string = '';
  userName: string = '';
  profileImage: string = '';
  gender: string = '';
  bDay: string = '';
  address: string = '';
  type: string = '';
  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}