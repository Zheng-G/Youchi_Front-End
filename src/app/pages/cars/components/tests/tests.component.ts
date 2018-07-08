import { Component } from '@angular/core';
import { AreaService } from '../../../../services/area.service';
import { TestItemService } from '../../../../services/testItem.service';
import { Area } from '../../../../models/area';
import { TestCategory } from '../../../../models/testCategory';
import { BaThemeSpinner } from '../../../../theme/services/baThemeSpinner';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'testDB-manager',
  templateUrl: './tests.html',
  styleUrls: ['./tests.scss']
})

export class TestDBManagerComponent {
  public areasData : Area[];
  public testCategories : TestCategory[];
  public selectedCategory : TestCategory;
  public categoryItems: any[];
  public selectedCategoryName: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public areaService: AreaService, 
              public testItemService: TestItemService,
              private spinner: BaThemeSpinner) {
    this.selectedCategoryName = '';
    this.spinner.showUploadStatus();
    this.areaService.getAreas().then((data) => {
      this.areasData = data;
    });

    this.testItemService.getTestItems().then((data) => {
      this.testCategories = data;
      this.spinner.hide();
    });
   
  }

  ngOnInit() {
  }

  handleCategorySelected(category) {
    console.log("category selected :", category);
    //get series based on selected brand
    if (category.categoryItems) {
      this.categoryItems = category.categoryItems;
    } else {
      this.categoryItems = []; 
    }
    // console.log("selected brand series data ：", this.brandSeries);
    this.selectedCategoryName = category.testCategory;
    this.selectedCategory = category;
  }

}
