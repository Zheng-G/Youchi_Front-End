import { Component } from '@angular/core';
import { BrandsService } from '../../../services/brands.service';
import { CarTypeService } from '../../../services/carType.service';
import { AreaService } from '../../../services/area.service';
import { UserService } from '../../../services/user.service';
import { Brand } from '../../../models/brand';
import { Series } from '../../../models/series';
import { CarType } from '../../../models/carType';
import { Area } from '../../../models/area';
import { User } from '../../../models/user';
import { BuyerRequestTable } from './buyer-request-table.component';
import { BuyerRequest } from '../../../models/buyerRequest';
import { BuyerRequestService } from '../../../services/buyerRequest.service';

@Component({
  selector: 'buyer-manager',
  templateUrl: './buyer-manager.html',
  styleUrls: ['../requests.scss']
})

export class BuyerManagerComponent {
  public buyerRequestsData: BuyerRequest[];
    
  public areasData : Area[];
  public usersData : User[];
  public brandsData: Brand[];
  public carTypes: CarType[];
  public totalSellcar = 0;


  constructor(public service: BuyerRequestService, public brandService: BrandsService, public carTypeService: CarTypeService, public areaService: AreaService, public userService: UserService) {
    this.service.getRequests().then((data) => {
        this.buyerRequestsData = data;
    })

    this.areaService.getAreas().then((data) => {
      this.areasData = data;
    });

    this.userService.getUsers().then((data) => {
      this.usersData = data;
    });
   
    this.brandService.getBrands().then((data) => {
      console.log("brands data from server : ", data);
      this.brandsData = data;
    });

    this.carTypeService.getCarTypes().then((data) => {
      console.log("car type data from server : ", data);
      this.carTypes = data;
    })
  }

  ngOnInit() {
  }

}
