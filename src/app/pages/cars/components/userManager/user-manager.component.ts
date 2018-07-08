import { Component } from '@angular/core';
import { BrandsService } from '../../../../services/brands.service';
import { CarTypeService } from '../../../../services/carType.service';
import { AreaService } from '../../../../services/area.service';
import { UserService } from '../../../../services/user.service';
import { Brand } from '../../../../models/brand';
import { Series } from '../../../../models/series';
import { CarType } from '../../../../models/carType';
import { Area } from '../../../../models/area';
import { User } from '../../../../models/user';
import {AppConfig} from '../../../../app.config';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { BaThemeSpinner } from '../../../../theme/services/baThemeSpinner';
@Component({
  selector: 'user-manager',
  templateUrl: './user-manager.html',
  styleUrls: ['./user-manager.scss']
})

export class UserManagerComponent {
  public areasData : Area[];
  public usersData : User[];
  public brandsData: Brand[];
  public carTypes: CarType[];
  public totalSellcar = 0;
  public filterUserPhone : string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: BrandsService,
              private carTypeService: CarTypeService, 
              private areaService: AreaService, 
              private userService: UserService,
              private spinner: BaThemeSpinner ) {
    this.spinner.showUploadStatus();  
    this.areaService.getAreas().then((data) => {
      this.areasData = data;
    });

    this.userService.getUsers().then((data) => {
      this.usersData = data;
    });
   
    this.service.getBrands().then((data) => {
      this.brandsData = data;
    });

    this.carTypeService.getCarTypes().then((data) => {
      this.carTypes = data;
      this.spinner.hideUploadStatus();
    });
    console.log('Parent node',this.brandsData, this.carTypes);
  
  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => {
      this.filterUserPhone = params['userPhone'];
      return params['userPhone'];
    }).subscribe(sellerId => {
      ;
    }, error => error);
  }

}
