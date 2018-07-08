import { Component, ChangeDetectorRef, OnDestroy,OnInit} from '@angular/core';
import { FAQ } from '../../models/faq'
import { FAQService } from '../../services/faq.service';
import { AppConfig } from '../../app.config';
import { NgUploaderOptions } from 'ngx-uploader';
import { SuggestiveCar } from '../../models/suggestiveCar';
import { SuggestiveCarService } from '../../services/suggestiveCar.service';
import { Http, Response } from '@angular/http';
import { SuggestionCarModal } from '../../modals/suggestion-car-modal/suggestion-car-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/observe.service';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

@Component({
  selector: 'contents',
  moduleId: module.id,
  templateUrl: './contents.html',
  styleUrls: ['./contents.scss'],
  providers: [CommonService]
  
})
export class ContentsComponent implements OnDestroy {
  public faqsData: FAQ[];
  bannerImageUrl1: string = '';
  bannerImageUrl2: string = '';
  bannerImageUrl3: string = '';
  bannerImageUrl4: string = '';
  bannerImageUrl5: string = '';
  suggestionImg1: string = '';
  suggestionImg2: string = '';
  suggestionImg3: string = '';
  headImg1: string = '';
  headImg2: string = '';
  headImg3: string = '';
  loadStatus: boolean = false;
  sugCars: SuggestiveCar[];
  firstSuggestion: SuggestiveCar;
  secondSuggestion: SuggestiveCar;
  thirdSuggestion: SuggestiveCar;
  message: any;
  subscription: Subscription;
  constructor(private service: FAQService, 
              private appConfig: AppConfig, 
              private sugService: SuggestiveCarService, 
              private modalService: NgbModal,
              private apiService: ApiService,
              private http: Http,
              private cdr: ChangeDetectorRef,
              private observe: CommonService
           ) {
    this.bannerImageUrl1 = this.appConfig.apiUrl + '/upload/headerBanner/' + 'home-banner-1.png';
    this.bannerImageUrl2 = this.appConfig.apiUrl + '/upload/headerBanner/' + 'home-banner-2.png';
    this.bannerImageUrl3 = this.appConfig.apiUrl + '/upload/headerBanner/' + 'home-banner-3.png';
    this.bannerImageUrl4 = this.appConfig.apiUrl + '/upload/headerBanner/' + 'sellcar-header-image.png';
    this.bannerImageUrl5 = this.appConfig.apiUrl + '/upload/headerBanner/' + 'sellcar-progress-image.png';
     this.subscription = this.observe.getMessage().subscribe(message => { this.message = message; });
      console.log(this.message, this.subscription,  "observer");
      let data = this.observe.getData();
      console.log("Receive data", data);
    this.service.getFAQs().then((data) => {
        this.faqsData = data;
    })
    this.getSuggestions();
  }

  ngOnChanges(changes) {
  }

  getSuggestions() {
   
    this.sugService.getSuggestions().then((data) => {
      this.sugCars = data;
      if ( this.sugCars ) {
        this.sugCars.forEach(suggestion => {
          if(suggestion.order === '1') {
            this.firstSuggestion = suggestion;
            this.suggestionImg1 = suggestion.imageUrl;
          }
          else if (suggestion.order === '2') {
            this.secondSuggestion = suggestion;
            this.suggestionImg2 = suggestion.imageUrl;
          }
          else if (suggestion.order === '3') {
            this.thirdSuggestion = suggestion;
            this.suggestionImg3 = suggestion.imageUrl;
          }
        });
      }
    });
  }
  
 
  updateBannerImg1(data) {
    let fileName: any;
    let filePath: any;
    console.log(data);

    if (data['response'] === "File uploaded!") {
      fileName = data['originalName'];
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      filePath = this.appConfig.apiUrl + '/upload/headerBanner/home-banner-1.' + ext + '?t=' + new Date().getTime();
      document.getElementById('bannerImg1').setAttribute('src', filePath);
    }
    console.log("updated value: ", filePath);
  }

  updateBannerImg2(data) {
    let fileName: any;
    let filePath: any;

    if (data['response'] === "File uploaded!") {
      fileName = data['originalName'];
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      filePath = this.appConfig.apiUrl + '/upload/headerBanner/home-banner-2.' + ext + '?t=' + new Date().getTime();
      document.getElementById('bannerImg2').setAttribute('src', filePath);
    }
  }

  updateBannerImg3(data) {
    let fileName: any;
    let filePath: any;

    if (data['response'] === "File uploaded!") {
      fileName = data['originalName'];
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      filePath = this.appConfig.apiUrl + '/upload/headerBanner/home-banner-3.' + ext + '?t=' + new Date().getTime();
      document.getElementById('bannerImg3').setAttribute('src', filePath);
    }
  }
  updateBannerImg4(data) {
    let fileName: any;
    let filePath: any;

    if (data['response'] === "File uploaded!") {
      fileName = data['originalName'];
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      filePath = this.appConfig.apiUrl + '/upload/headerBanner/sellcar-header-image.' + ext + '?t=' + new Date().getTime();
      document.getElementById('bannerImg4').setAttribute('src', filePath);
    }
  }
  updateBannerImg5(data) {
    let fileName: any;
    let filePath: any;

    if (data['response'] === "File uploaded!") {
      fileName = data['originalName'];
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      filePath = this.appConfig.apiUrl + '/upload/headerBanner/sellcar-progress-image.' + ext + '?t=' + new Date().getTime();
      document.getElementById('bannerImg5').setAttribute('src', filePath);
    }
  }

  onFirstSuggestion() {
    const activeModal = this.modalService.open(SuggestionCarModal, {size: 'lg', backdrop:'static'});
    activeModal.componentInstance.order = '1';
    activeModal.componentInstance.modalHeader = '第一推荐车型';
    activeModal.componentInstance.suggestion = this.firstSuggestion;
    activeModal.componentInstance.sugCars = this.sugCars;
    // activeModal.componentInstance.type = "slide2";
    activeModal.result.then((resutl) => {
      this.handleSuggestionChanged();
    }, (error) => {
      console.log(error)
    });
  }

  onSecondSuggestion() {
    const activeModal = this.modalService.open(SuggestionCarModal, {size: 'lg', backdrop:'static'});
    activeModal.componentInstance.order = '2';
    activeModal.componentInstance.modalHeader = '第二推荐车型';
    activeModal.componentInstance.suggestion = this.secondSuggestion;
    activeModal.componentInstance.sugCars = this.sugCars;
    activeModal.result.then((resutl) => {
      this.handleSuggestionChanged();
    }, (error) => {
      console.log(error)
    });    
  }

  onThirdSuggestion() {
    const activeModal = this.modalService.open(SuggestionCarModal, {size: 'lg', backdrop:'static'});
    activeModal.componentInstance.order = '3';
    activeModal.componentInstance.modalHeader = '第三推荐车型';
    activeModal.componentInstance.suggestion = this.thirdSuggestion;
    activeModal.componentInstance.sugCars = this.sugCars;
    activeModal.result.then((resutl) => {
      this.handleSuggestionChanged();
    }, (error) => {
      console.log(error)
    });

  }

  public fileUploaderOptions1:NgUploaderOptions = {
    url: this.appConfig.apiUrl + '/uploader/headerBanner1?token=' + this.apiService.getToken(),
    fieldName: 'headerBannerImage',
    filterExtensions: true,
    allowedExtensions: ['image/png']
  };

  public fileUploaderOptions2:NgUploaderOptions = {
    url: this.appConfig.apiUrl + '/uploader/headerBanner2?token=' + this.apiService.getToken(),
    fieldName: 'headerBannerImage',
    filterExtensions: true,
    allowedExtensions: ['image/png']
  };

  public fileUploaderOptions3:NgUploaderOptions = {
    url: this.appConfig.apiUrl + '/uploader/headerBanner3?token=' + this.apiService.getToken(),
    fieldName: 'headerBannerImage',
    filterExtensions: true,
    allowedExtensions: ['image/png']
  };
  public fileUploaderOptions4:NgUploaderOptions = {
    url: this.appConfig.apiUrl + '/uploader/headerBanner4?token=' + this.apiService.getToken(),
    fieldName: 'headerBannerImage',
    filterExtensions: true,
    allowedExtensions: ['image/png']
  };
  public fileUploaderOptions5:NgUploaderOptions = {
    url: this.appConfig.apiUrl + '/uploader/headerBanner5?token=' + this.apiService.getToken(),
    fieldName: 'headerBannerImage',
    filterExtensions: true,
    allowedExtensions: ['image/png']
  };
  
  handleSuggestionChanged() {
    console.log("suggestion changed here");
    this.getSuggestions();
    this.cdr.detectChanges();

  }  
   ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
