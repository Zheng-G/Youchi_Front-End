import { Component } from '@angular/core';
import { BrandsService } from '../../../../services/brands.service';
import { CarTypeService } from '../../../../services/carType.service';
import { AreaService } from '../../../../services/area.service';
import { UserService } from '../../../../services/user.service';
import { SellCarService } from '../../../../services/sellCar.service';
import { TestItemService } from '../../../../services/testItem.service';
import { Brand } from '../../../../models/brand';
import { Series } from '../../../../models/series';
import { CarType } from '../../../../models/carType';
import { Area } from '../../../../models/area';
import { User } from '../../../../models/user';
import { Car } from '../../../../models/car';
import { TestCategory } from '../../../../models/testCategory';
import { BaThemeSpinner } from '../../../../theme/services/baThemeSpinner';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'sell-car-manager',
  templateUrl: './sellCarManager.html',
  styleUrls: ['./sellCarManager.scss'],
  providers: [SellCarService]
})

export class SellCarManagerComponent {
  public areasData : Area[];
  public usersData : User[];
  public brandsData: Brand[];
  public carTypes: CarType[];
  public sellcarsData: Car[];
  public testCategoriesData: TestCategory[];

  public filterSellerId;
  public filterUDID;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public service: BrandsService, 
              public carTypeService: CarTypeService, 
              public areaService: AreaService, 
              public userService: UserService,
              public sellcarService: SellCarService,
              public testItemService: TestItemService,
              private spinner: BaThemeSpinner) {
    // this.spinner.showUploadStatus();
    this.areaService.getAreas().then((data) => {
      this.areasData = data;
    });

    this.userService.getUsers().then((data) => {
      this.usersData = data;
    });
   
    this.service.getBrands().then((data) => {
      console.log("brands data from server : ", data);
      this.brandsData = data;
    });

    this.carTypeService.getCarTypes().then((data) => {
      console.log("car type data from server : ", data);
      this.carTypes = data;
    })

    this.sellcarService.getSellCars().then((data) => {
      console.log("sell car data from server : ", data);
      this.sellcarsData = data;
    })

    this.testItemService.getTestItems().then((data) => {
      console.log("test category data from server : ", data);
      this.testCategoriesData = data;
      // this.spinner.hideUploadStatus();
    })
  }

  ngOnInit() {
    // this.route.params['sellerId'];
    this.route.params.switchMap((params: Params) => {
      this.filterSellerId = params['sellerId'];
      this.filterUDID = params['sellcarUDID'];
      return params['sellerId'];
    }).subscribe(sellerId => {
      ;
    }, error => error);

    console.log("seller id: ", this.filterSellerId);
    console.log("sellcar UDID: ", this.filterUDID);
  }

  ngOnDestroy() {

  }

}
