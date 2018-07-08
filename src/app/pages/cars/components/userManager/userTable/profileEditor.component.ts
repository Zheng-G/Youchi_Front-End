import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { NgUploaderOptions } from 'ngx-uploader';
import { AppConfig } from '../../../../../app.config';
import { ApiService } from '../../../../../services/api.service';

@Component({
  template: `
    <ba-card title="Logo Image" baCardClass="with-scroll">
      <ba-picture-uploader #logoImage [picture]="logoImagePath" [defaultPicture]="defaultPicture" [uploaderOptions]="uploaderOptions" (onUploadCompleted)="updateValue($event)"></ba-picture-uploader>
    </ba-card>
    <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
  `,
})
export class ProfileEditorComponent extends DefaultEditor implements AfterViewInit {

  @ViewChild('htmlValue') htmlValue: ElementRef;
  @ViewChild('logoImage') logoImage: ElementRef;
  public defaultPicture = 'assets/img/theme/no-photo.png';
  logoImagePath: any;
  
  constructor( private cdr: ChangeDetectorRef, private appConfig: AppConfig, private apiService: ApiService ) {
    super();
    this.logoImagePath = '';
  }

  ngAfterViewInit() {
    if (this.cell.newValue !== '') {
      this.logoImagePath = this.getUrlHref();
      this.cdr.detectChanges();
    }
  }

  updateValue(data) {
    let fileName: any;
    let filePath: any;

    if (data['response'] === "File uploaded!") {
      fileName = data['originalName'];
      filePath = this.appConfig.apiUrl + '/upload/userProfiles/' + fileName;

    }
    console.log("updated value: ", filePath);
    
    this.cell.newValue = filePath;
  }

  getUrlHref(): string {
    return this.htmlValue.nativeElement.querySelector('img').getAttribute('src');
  }

  public uploaderOptions:NgUploaderOptions = {
    url: this.appConfig.apiUrl + '/uploader/userProfiles?token=' + this.apiService.getToken(),
    fieldName: 'userProfileImage'
  };

}
