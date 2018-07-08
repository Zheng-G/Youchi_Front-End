import { Component, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../models/user';
import { Brand } from '../../models/brand';
import { Series } from '../../models/series';
import { CarType } from '../../models/carType';
import { Area } from '../../models/area';
import { Car } from '../../models/car'; 
/////////////////Git
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { AppConfig } from '../../app.config';
import { HttpClient } from '../../services/upload.service';
import { SellCarService } from '../../services/sellCar.service';
import { CarTypeService } from '../../services/carType.service';
import { BrandsService } from '../../services/brands.service';
import { BaThemeSpinner } from '../../theme/services/baThemeSpinner';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../services/observe.service';
@Component({
  moduleId: module.id,
  selector: 'add-sellcar',
  styles: [`
      .custom-day {      
        text-align: center;
        padding: 0.185rem 0.25rem;
        border-radius: 0.25rem;
        display: inline-block;
        width: 2rem;
      }
      .custom-day:hover {
        background-color: #e6e6e6;
      }
      .weekend {
        background-color: #f0ad4e;
        border-radius: 1rem;
        color: white;
      }
      .hidden {
        display: none;
      }
    `],  
  styleUrls: [('./car-info-modal.component.scss')],
  templateUrl: './car-info-modal.component.html',
  providers: [SellCarService]
})

export class CarInfoModal  implements AfterViewInit {
  @ViewChild('htmlValue') htmlValue: ElementRef;
  uniqueId: string;
  modalHeader: string;
  mode: string;
  //if mode = 'create', then userData: User. if mode = 'edit', then userData: Car
  @Input() userData: any; 
  
  sellcarTableSource;
  
  brandsData: Brand[];
  selectedBrand: Brand;
  selectedBrandSeries: any[];
  selectedSeries: Series;
  showSeriesInput: boolean;

  carTypes: CarType[];

  selectedCarType: any;
  selectedCarColor: any;
  productionCountry: any;
  carGearshift: any;
  carOil: any;
  carCapability: any;
  carEmissionLevel: any;

  areasData: Area[];
  carPlacedCity: Area;

  emissionAmount = "";
  description = "";
  totalDriven = "";
  currentCarPlace = "";
  price = "";
  newPrice = "";
  carStatus = "等待验车";
  soldStatus = {};
  // if(carStatus='出售完成'){
  //     this.soldStatus = this.soldStatus;  
  // }
  
  insuranceMsg = { msg1: {}, msg2: {}, msg3: { status: 0 }, msg4: {}};
  imageUrls = [];
  testResult: any;

  public defaultPicture = 'assets/img/theme/no-photo.png';
  logoImagePath: any;

  carImageFiles: File[];
  
    status: any;
    hideNumber: boolean ;
    disabled: boolean;

  


  // for the date picker - start
  purchaseDate: NgbDateStruct;
  marketingStartDate: NgbDateStruct;
  buyDate: NgbDateStruct;
  
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }
  // for the date picker - end
  

  constructor(private activeModal: NgbActiveModal, 
              private cdr: ChangeDetectorRef, 
              private appConfig: AppConfig, 
              private apiService: SellCarService, 
              private uploadService: HttpClient,
              private cartypeService: CarTypeService,
              private brandsService: BrandsService,
              private spinner: BaThemeSpinner,
              private observe: CommonService ) {
    this.logoImagePath = '';
    this.uniqueId = '';
    // this.observe.sendMessage('new message');
    // console.log('Sending...........');
    // this.status = true;
    
   
  }

  ngAfterViewInit() {
    console.log('---------------------------- load view --------------------------');
    console.log(this.testResult);
    console.log('----------------------------load view user data -----------------');
    console.log(this.userData);
  
    if (this.mode === 'edit') {  
      this.uniqueId = this.userData.uniqueId;
    }
      
    if (this.mode === 'edit' && this.brandsData.length !== 0 && Object.keys(this.selectedBrand).length !== 0) {
      let brandIdx = 0;
      for (let i = 0; i < this.brandsData.length; i ++) {
        if (this.selectedBrand.chName === this.brandsData[i].chName)
        {
          brandIdx = i;
          break;
        }
      }
      this.selectedBrand = this.brandsData[brandIdx];
      this.selectedBrandSeries = this.selectedBrand.series;
      this.testResult = this.userData.testResult;

      if(this.selectedBrandSeries.length !== 0) {
        for (let i = 0; i < this.selectedBrandSeries.length; i ++) {
          if (this.selectedSeries.chName === this.selectedBrandSeries[i].chName)
          {
            brandIdx = i;
            break;
          }
        }
        this.selectedSeries = this.selectedBrandSeries[brandIdx];
      }
    }
    if (this.mode === 'edit') {
      let idx = 0;
      // car type
      if(this.carTypes && Object.keys(this.userData.carType).length !== 0) {
        console.log(this.userData.carType);
        for(let i = 0; i < this.carTypes[0].type.length; i ++) {
          if(this.userData.carType.chName === this.carTypes[0].type[i].chName) {
            idx = i;
            break;
          }
        }
        this.selectedCarType = this.carTypes[0].type[idx];
      }
      //car color
      if(this.carTypes && Object.keys(this.userData.carColor).length !== 0) {
        for(let i = 0; i < this.carTypes[0].color.length; i ++) {
          if(this.userData.carColor.colorName === this.carTypes[0].color[i].colorName) {
            idx = i;
            break;
          }
        }
        this.selectedCarColor = this.carTypes[0].color[idx];
      }
      //production country
      if (this.carTypes && Object.keys(this.userData.productCountry).length !== 0) {
        for(let i = 0; i < this.carTypes[0].productCountry.length; i ++) {
          if(this.userData.productCountry.countryName === this.carTypes[0].productCountry[i].countryName) {
            idx = i;
            break;
          }
        }
        this.productionCountry = this.carTypes[0].productCountry[idx];
      }
      if (this.userData.gearshift !== "")
        this.carGearshift = this.userData.gearshift;
      //oil type
      if (this.carTypes && Object.keys(this.userData.fuelOil).length !== 0) {
        for(let i = 0; i < this.carTypes[0].fuelOil.length; i ++) {
          if(this.userData.fuelOil.oilName === this.carTypes[0].fuelOil[i].oilName) {
            idx = i;
            break;
          }
        }
        this.carOil = this.carTypes[0].fuelOil[idx];
      }
      //capability
      if (this.carTypes && Object.keys(this.userData.capability).length !== 0) {
        for(let i = 0; i < this.carTypes[0].capability.length; i ++) {
          if(this.userData.capability.capability === this.carTypes[0].capability[i].capability) {
            idx = i;
            break;
          }
        }
        this.carCapability = this.carTypes[0].capability[idx];
      }
      //emissionLevel
      if (this.carTypes && Object.keys(this.userData.emissionLevel).length !== 0) {
        for(let i = 0; i < this.carTypes[0].emission.length; i ++) {
          if(this.userData.emissionLevel.emissionLevel === this.carTypes[0].emission[i].emissionLevel) {
            idx = i;
            break;
          }
        }
        this.carEmissionLevel = this.carTypes[0].emission[idx];
      }
      //emission amount
      if (this.userData.emissionAmount)
        this.emissionAmount = this.userData.emissionAmount;
      //price
      if (this.userData.price)
        this.price = this.userData.price;
      //newprice
     
      if (this.userData.newPrice != null){
        this.newPrice = this.userData.newPrice;
      } else {
        this.newPrice = this.price;
      }
      //purchase date
      if (this.userData.purchaseDate !== {}) 
        this.purchaseDate = this.userData.purchaseDate;
      if (this.userData.marketingStartDate !== {}) 
        this.marketingStartDate = this.userData.marketingStartDate;
      //total driven
      if (this.userData.totalDriven)
        this.totalDriven = this.userData.totalDriven;
      //car city
      if (this.userData.city && Object.keys(this.userData.city).length !== 0 && this.areasData !== {}) {
        for(let   i = 0; i < this.areasData.length; i ++) {
          if(this.userData.city.chName === this.areasData[i].chName) {
            idx = i;
            break;
          }
        }
        this.carPlacedCity = this.areasData[idx];
      }
      
      if(this.userData.carStatus='出售完成'&&this.userData.soldStatus!=null){
        this.soldStatus = this.userData.soldStatus;
      }


      if(this.userData.insuranceMsg!=null){
        this.insuranceMsg = this.userData.insuranceMsg;
      }        
   
      //test place
      if (this.userData.currentCarPlace)
        this.currentCarPlace = this.userData.currentCarPlace;
      //seller description
      if (this.userData.sellerDescription)
        this.description = this.userData.sellerDescription;
      //status
      if (this.userData.status)
        this.carStatus = this.userData.status;
      // Car Images
      this.loadImagesFromImageList(this.userData.carImages);
    }
       
    this.cdr.detectChanges();
    
  }

  loadImagesFromImageList(imgSourceList) {
    console.log(imgSourceList); 
    if (imgSourceList) {      
      this.imageUrls = imgSourceList;      
    }
  }

  handleFileSelect(evt) {
    this.carImageFiles = evt.target.files; // FileList object

    this.imageUrls = [];
    var that = this;

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = this.carImageFiles[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          that.imageUrls.push({imagePath: e.target.result});
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  closeModal() {
    
    this.activeModal.close();
  }

  getUrlHref(): string {
    return this.htmlValue.nativeElement.querySelector('img').getAttribute('src');
  }

  getUploaderOptions() {
    let uploaderOptions:NgUploaderOptions = {
      url: this.appConfig.apiUrl + '/uploader/carImages',
      data: { userId: this.userData._id, imageIndex: 1 },
      fieldName: 'carImage'
    };
    return uploaderOptions;
  }

  onChangeBrand(brand) {
    this.selectedBrand = brand;
    this.selectedBrandSeries = brand.series;
  }

  onChangeSeries(series) {
    this.selectedSeries = series;
  }

  onChangeCarType(type) {
    this.selectedCarType = type;
  }

  onChangeCarColor(data) {
    this.selectedCarColor = data;
  }

  onChangeProdCountry(country) {
    this.productionCountry = country;
  }

  onChangeGearType(gear) {
    this.carGearshift = gear;
  }

  onChangeOil(oil) {
    this.carOil = oil;
  }

  onChangeCapability(cap) {
    this.carCapability = cap;
  }

  onChangeEmissionLevel(el) {
    this.carEmissionLevel = el;
  }

  onChangeCarPosition(city) {
    this.carPlacedCity = city;
  }

  onChangeCarStatus(status) {
    console.log(status);
    if(status == '出售完成') {
      this.hideNumber = false;
    } else {
      this.hideNumber = true;
    }
    this.carStatus = status;
  }

  getCurrentCarInfo(sellerId, sellerPhone, sellerName) {

    console.log('----------------------- get current car info ----------------------------');
    console.log(this.testResult);
    var newCar = {
      uniqueId: this.uniqueId,
      sellerId: sellerId,
      sellerPhone: sellerPhone,
      sellerName: sellerName,
      brand: this.selectedBrand ? this.selectedBrand : {},
      series: this.selectedSeries ? this.selectedSeries : {},
      carType: this.selectedCarType ? this.selectedCarType : {},
      carColor: this.selectedCarColor ? this.selectedCarColor : {},
      gearshift: this.carGearshift ? this.carGearshift : '',
      productCountry: this.productionCountry ? this.productionCountry : {},
      fuelOil: this.carOil ? this.carOil : {},
      capability: this.carCapability ? this.carCapability : {},
      emissionLevel: this.carEmissionLevel ? this.carEmissionLevel : {},
      emissionAmount: this.emissionAmount ? parseFloat(this.emissionAmount) : 0,
      price: this.price ? parseFloat(this.price) : 0,
      newPrice: this.newPrice ? parseFloat(this.newPrice) : 0,
      purchaseDate: this.purchaseDate ? this.purchaseDate : {},
      marketingStartDate: this.marketingStartDate ? this.marketingStartDate : {},
      buyData: this.buyDate ? this.buyDate : {},
      totalDriven: this.totalDriven ? parseFloat(this.totalDriven) : 0,
      soldStatus:this.soldStatus ? this.soldStatus :{},
      insuranceMsg: this.insuranceMsg ? this.insuranceMsg : { msg1: {}, msg2: {}, msg3: {}, msg4: {}},
      currentCarPlace: this.currentCarPlace ? this.currentCarPlace : '',
      city: this.carPlacedCity ? this.carPlacedCity : {},
      sellerDescription: this.description ? this.description : '',
      carImages: this.imageUrls ? this.imageUrls : {},
      status: this.carStatus ? this.carStatus : '',
      testResult: this.testResult ? this.testResult : []

    }
    console.log("car data: ", newCar);  
    return newCar;
  }

  registerSellcar() {
    var newCar = this.getCurrentCarInfo(this.userData._id, this.userData.phoneNumber, this.userData.userName);
    this.apiService.createSellcar(newCar).then((data) => {
      this.spinner.hide();
      console.log("response for create sell car : ", data);
      if (data != null) {
        if (data.status === 200) {
          console.log("sellcar added to server : ", data);
          this.closeModal();
        }
      }
      else {
        window.alert("Sell Car registration failed with some issue. Please check your internet connection!");
      }
    });
  }

  updateSellcar() {
    console.log('------------------------ update sell car -----------------------------');
    this.insuranceMsg.msg3.status = this.insuranceMsg.msg3.status ? 1 : 0;
    // if (!this.imageUrls) 
    //   this.imageUrls = this.userData.carImages;
    var putCar = this.getCurrentCarInfo(this.userData.sellerId, this.userData.sellerPhone, this.userData.sellerName);
    if (putCar.status !== '出售完成'){
       putCar["soldStatus"] = {};
    }
    putCar["_id"] = this.userData._id;
    console.log("---------------------- update car ------------------------------: ", putCar);  
    this.spinner.hide();
    this.apiService.updateCar(putCar).then((data) => {
      console.log("response for update sell car : ", data);
      
      if (data != null) {
        if (data.status === 200) {
          console.log("sellcar updated to server : ", data);
          // update table row data
          this.sellcarTableSource.update(this.userData, putCar);
          this.sellcarTableSource.refresh();
          this.closeModal();
        }
      }
      else {
        window.alert("Sell Car update failed with some issue. Please check your internet connection!");
      }
    });
  }

  onSave() {
    console.log("car unique id ", this.uniqueId);
    this.spinner.showUploadStatus();
    if (this.mode === 'create') {
      // if (this.uniqueId === '' || !this.uniqueId) {
      //   window.alert('Please input car UDID!');
      //   return;
      // }
      this.registerSellcar();
    } else {
      if (this.carImageFiles) {
        this.imageUrls = [];
        this.uploadService.postWithFile('/uploader/carImages', { userId: this.userData.sellerId, carId: this.userData._id }, this.carImageFiles).then(result => {
          
          result["imagePath"].forEach(element => {
            this.imageUrls.push({'imagePath': this.appConfig.apiUrl + '/upload/carImages/' + this.userData.sellerId + '/' + this.userData._id + '/' + element.imagePath});
          });
          this.updateSellcar();
        }).catch(err=>{
          this.spinner.hide();
          console.log(err);
          window.alert("Sell Car update failed with some issue. Please check your internet connection!");
        });
      } else {
        this.updateSellcar();
      }
    }

  }

}
