import {Component} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import {AppConfig} from '../../../../app.config';
@Component({
  selector: 'layouts',
  templateUrl: './layouts.html',
})
export class Layouts {

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: this.appConfig.apiUrl + '/uploader/headerBanner2',
    fieldName: 'headerBannerImage',
    
    // url: '',
  };
  
  constructor(private appConfig: AppConfig) {
  }

  ngOnInit() {
  }
}
