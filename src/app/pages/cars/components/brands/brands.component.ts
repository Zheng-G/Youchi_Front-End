import { Component } from '@angular/core';
import { BrandsService } from '../../../../services/brands.service';
import { CarTypeService } from '../../../../services/carType.service';
import { Brand } from '../../../../models/brand';
import { Series } from '../../../../models/series';
import { CarType } from '../../../../models/carType';
import { BrandsTable } from './brandsTable/brandsTable.component';
import { SeriesTable } from './seriesTable/seriesTable.component';
import { TypeTable } from './typeTable/typeTable.component';
import { BaThemeSpinner } from '../../../../theme/services/baThemeSpinner';
@Component({
  selector: 'brands',
  templateUrl: './brands.html',
  styleUrls: ['./brands.scss']
})

export class BrandsComponent {
  public brands: Brand[];
  public brandSeries: Series[];
  public carTypes: CarType[];
  public selectedBrandName: String;
  public selectedBrand: Brand;

  constructor(public service: BrandsService, public carTypeService: CarTypeService, private spinner: BaThemeSpinner) {
    this.spinner.showUploadStatus();
    this.service.getBrands().then((data) => {
      console.log("brands data from server : ", data);
      this.brands = data;
      this.selectedBrandName = '';
    });

    this.carTypeService.getCarTypes().then((data) => {
      console.log("car type data from server : ", data);
      this.carTypes = data;
      this.spinner.hideUploadStatus();
    })
  }

  ngOnInit() {
  }

  handleBrandSelected(brand) {
    //get series based on selected brand
    if (brand.series) {
      this.brandSeries = brand.series;
    } else {
      this.brandSeries = []; 
    }
    // console.log("selected brand series data ：", this.brandSeries);
    this.selectedBrandName = brand.chName;
    this.selectedBrand = brand;
  }
}
