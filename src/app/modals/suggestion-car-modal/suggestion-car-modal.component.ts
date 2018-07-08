import { Component, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../models/user';
import { Brand } from '../../models/brand';
import { Series } from '../../models/series';
import { CarType } from '../../models/carType';
import { Area } from '../../models/area';
import { Car } from '../../models/car';
import { SuggestiveCar } from '../../models/suggestiveCar';
import { Http, Response } from '@angular/http';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { AppConfig } from '../../app.config';
import { HttpClient } from '../../services/upload.service';
import { SuggestiveCarService } from '../../services/suggestiveCar.service';
import { ApiService } from '../../services/api.service';
import { ContentsComponent } from '../../pages/contents/contents.component'
import { BaThemeSpinner } from '../../theme/services/baThemeSpinner';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../services/observe.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'suggestion-car-modal',
  styleUrls: [('./suggestion-car-modal.scss')],
  templateUrl: './suggestion-car-modal.html',
  providers:[CommonService]
})

export class SuggestionCarModal  implements AfterViewInit {
  @ViewChild('htmlValue') htmlValue: ElementRef;
//   uniqueId: string;
  //if mode = 'create', then userData: User. if mode = 'edit', then userData: Car
  @Input() suggestion: any; 
  modalHeader: string;
  order: string;
  uploadStatus: boolean = false;
  suggestionBrand: string = '';
  startPrice: string = '';
  
  parent: ContentsComponent;

  carImageFiles: File[];
  imageChanged = false;

  constructor(private activeModal: NgbActiveModal, private cdr: ChangeDetectorRef, 
              private appConfig: AppConfig, private apiService: SuggestiveCarService, 
              private uploadService: HttpClient, private auth: ApiService,private spinner: BaThemeSpinner,
              private http: Http, private observe: CommonService) {
  }

  ngAfterViewInit() {
    if (this.suggestion) {
      this.imageChanged = false;
      this.suggestionBrand = this.suggestion.chName;
      this.order = this.suggestion.order;
      this.startPrice = this.suggestion.startPrice;
      this.loadImagesFromImageList(this.suggestion.imageUrl);
    }
    
    this.cdr.detectChanges();
  }

  Send():any{
    return 'observe';
  }
  loadImagesFromImageList(imgUrl) {
    if (imgUrl) {
      this.carImageFiles = imgUrl;
      var span = document.createElement('span');
      span.innerHTML = ['<div style="display: inline-block"><img class="thumb" src="', imgUrl,
                        '" width="100%" style="border: 1px solid #000; margin: 10px 5px 0 0;"/></div>'].join('');
      document.getElementById('list').insertBefore(span, null);
    }
  }

  handleFileSelect(evt) {
    this.imageChanged = true;
    document.getElementById('list').innerHTML = '';
    var isImageValid = false;
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = evt.target.files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.png')) {
        continue;
      }
      isImageValid = true;
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<div style="display: inline-block"><img class="thumb" src="', e.target.result,
                            '" title="', encodeURI(theFile.name), '" width="100%" style="margin: 10px 5px 0 0;"/></div>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }

    if (isImageValid)
      this.carImageFiles = evt.target.files; // FileList object

  }

  closeModal() {
    
    this.activeModal.close();
  }

  getUrlHref(): string {
    return this.htmlValue.nativeElement.querySelector('img').getAttribute('src');
  }

  getUploaderOptions() {
    // let uploaderOptions:NgUploaderOptions = {
    //   url: this.appConfig.apiUrl + '/uploader/carImages',
    //   data: { userId: this.userData._id, imageIndex: 1 },
    //   fieldName: 'carImage'
    // };
    // return uploaderOptions;
  }

  onChangeBrand(brand) {
    this.suggestionBrand = brand;
  }

  onChangePrice(price) {
    this.startPrice = price;
  }
  // onChangeNewPrice(newprice) {
  //   this.startPrice = newprice;
  // }
 
  onSave() {
    console.log("onSave");
       
        console.log("onSave");
        if (this.suggestionBrand === '') {
          window.alert('请输入推荐品牌！');
          return;
        }
        if (this.startPrice === '') {
          window.alert('请输入起步价！');
          return;
        }
        if (!this.carImageFiles) {
          window.alert('请选择图片！');
          return;
        }

    if (this.suggestion) {
        this.suggestion.chName = this.suggestionBrand;
        this.suggestion.order = this.order;
        if (this.order === '1')
          this.suggestion.imageUrl = this.appConfig.apiUrl + '/upload/headerBanner/suggestion-car-1.png' + '?t=' + new Date().getTime();
        else if (this.order === '2')
          this.suggestion.imageUrl = this.appConfig.apiUrl + '/upload/headerBanner/suggestion-car-2.png' + '?t=' + new Date().getTime();
        else if (this.order === '3')
          this.suggestion.imageUrl = this.appConfig.apiUrl + '/upload/headerBanner/suggestion-car-3.png' + '?t=' + new Date().getTime();
        this.suggestion.startPrice = this.startPrice;
        
        if (this.imageChanged) {
          // this.spinner.showUploadStatus();
          this.uploadStatus = true;
          this.uploadService.postWithFile('/uploader/suggestionImages?token=' + this.auth.getToken(), { suggestionOrder: this.order }, this.carImageFiles).then(result => {
            this.updateSuggestion();
          }).catch(err=>{
            window.alert("Update failed with some issue. Please check your internet connection!");
          });
        }
        else {
          this.updateSuggestion();
        }
    }
    else {
      var imageUrl = '';
      if (this.order === '1')
        imageUrl = this.appConfig.apiUrl + '/upload/headerBanner/suggestion-car-1.png' + '?t=' + new Date().getTime();
      else if (this.order === '2')
        imageUrl = this.appConfig.apiUrl + '/upload/headerBanner/suggestion-car-2.png' + '?t=' + new Date().getTime();
      else if (this.order === '3')
        imageUrl = this.appConfig.apiUrl + '/upload/headerBanner/suggestion-car-3.png' + '?t=' + new Date().getTime();
      this.suggestion = [{
          chName: this.suggestionBrand, 
          order: this.order,
          startPrice: this.startPrice,
          imageUrl: imageUrl
        }];
      // this.spinner.hideUploadStatus();
      this.uploadStatus = false;
      this.uploadService.postWithFile('/uploader/suggestionImages?token=' + this.auth.getToken(), { suggestionOrder: this.order }, this.carImageFiles).then(result => {
        this.registerSuggestion();
      }).catch(err=>{
        console.log(err);
        window.alert("Update failed with some issue. Please check your internet connection!");
      });
    }
  }

  updateSuggestion() {
     
    this.apiService.updateSuggestion(this.suggestion).then((data) => {
          // this.spinner.hideUploadStatus();
      this.uploadStatus = false;
      console.log("response for create suggestion : ", data);
      if (data != null) {
        if (data.status === 200) {
          console.log("sellcar added to server : ", data);
          this.closeModal();
        }
      }
      else {
        window.alert("Suggsetion registration failed with some issue. Please check your internet connection!");
      }
    });    
  }

  registerSuggestion() {
    this.apiService.createSuggestion(this.suggestion).then((data) => {
      //  this.spinner.hideUploadStatus();
      this.uploadStatus = false;
      console.log("response for create suggestion : ", data);
      if (data != null) {
        if (data.status === 200) {
          console.log("sellcar added to server : ", data);
          this.closeModal();
        }
      }
      else {
        window.alert("Suggsetion update failed with some issue. Please check your internet connection!");
      }
    });
  }
}
