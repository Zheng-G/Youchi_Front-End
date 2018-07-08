import { Component, NgModule,NgModuleFactory, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from "@angular/forms"
import { User } from '../../models/user';
import { Brand } from '../../models/brand';
import { Series } from '../../models/series';

import { CarType } from '../../models/carType';
import { Area } from '../../models/area';
import { Car } from '../../models/car';
import { TestCategory } from '../../models/testCategory';

import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { AppConfig } from '../../app.config';
import { HttpClient } from '../../services/upload.service';
import { SellCarService } from '../../services/sellCar.service';
import { TestItemService } from '../../services/testItem.service';
import * as $ from 'jquery';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'car-test-modal',
  styleUrls: [('./car-test-modal.scss')],
  templateUrl: './car-test-modal.html',
  providers: [SellCarService]
})

export class CarTestModal  implements AfterViewInit {
  modalHeader: string;

  @Input() carInfo: any; 
  testCategories: TestCategory[];
  testResult: TestCategory[];

  constructor(private activeModal: NgbActiveModal,
              private cdr: ChangeDetectorRef, 
              private apiService: SellCarService, 
              private testService :TestItemService,
              private uploadService: HttpClient) {
                 
  }

  ngAfterViewInit(){
    if(this.carInfo) {
      console.log('-------------------------- test car result modal ----------------------');
      console.log(this.carInfo);
      this.testCategories = this.carInfo['testCategories'];
      this.testResult = this.carInfo['testResult'];
      if (Object.keys(this.testResult).length === 0 || !this.testResult) {
        // test result is empty
        this.testResult = this.makeTempCopyOfArray(this.testCategories);
      }
      else {
        this.testResult = this.makeTempCopyOfArray(this.testResult);
      }
    }
    this.cdr.detectChanges();
  }

  makeTempCopyOfArray(array) {
    let tempArray = [];
    for (var i = 0; i < array.length; i++) {
      let item = array[i]
      let tempArray1 = [];
      for (var j = 0; j < item.categoryItems.length; j ++ ) {
        let item1 = item.categoryItems[j];
        tempArray1[j] = {'testItemName': item1.testItemName, 'checked': item1.checked};
      }
      tempArray[i] = {'categoryItems': tempArray1, 'testCategory': item.testCategory}
    }
    return tempArray;
  }

  onSave() {
    this.updateSellcar();
    this.closeModal();
  }

  updateSellcar() {
    var putCar = this.getCurrentCarInfo();
    this.apiService.updateCar(putCar).then((data) => {
      if (data != null) {
        if (data.status === 200) {
          this.carInfo['testResult'] = this.testResult;
          this.closeModal();
        }
      }
      else {
        window.alert("Sell Car test result update failed with some issue. Please check your internet connection!");
      }
    });
  }

  getCurrentCarInfo() {
    var newCar = {
      _id: this.carInfo['_id'],
      uniqueId: this.carInfo['uniqueId'],
      sellerId: this.carInfo['sellerId'],
      sellerPhone: this.carInfo['sellerPhone'],
      sellerName: this.carInfo['sellerName'],
      brand: this.carInfo['brand'],
      series: this.carInfo['series'],
      carType: this.carInfo['carType'],
      carColor: this.carInfo['carColor'],
      gearshift: this.carInfo['gearshift'],
      productCountry: this.carInfo['productCountry'],
      fuelOil: this.carInfo['fuelOil'],
      capability: this.carInfo['capability'],
      emissionLevel: this.carInfo['emissionLevel'],
      emissionAmount: this.carInfo['emissionAmount'],
      price: this.carInfo['price'],
      purchaseDate: this.carInfo['purchaseDate'],
      marketingStartDate: this.carInfo['marketingStartDate'],
      totalDriven: this.carInfo['totalDriven'],
      currentCarPlace: this.carInfo['currentCarPlace'],
      city: this.carInfo['city'],
      sellerDescription: this.carInfo['sellerDescription'],
      carImages: this.carInfo['carImages'],
      status: this.carInfo['status'],
      testResult: this.testResult,
      newPrice:this.carInfo['newPrice'],
      insuranceMsg:this.carInfo['insuranceMsg'],
      soldStatus:(this.carInfo['status'] === '出售完成') ? this.carInfo.soldStatus: {}
    }
    return newCar;
  }

  closeModal(){
    this.activeModal.close();
  }

}
