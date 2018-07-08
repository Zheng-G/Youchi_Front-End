import {Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { BaThemeSpinner } from '../../services/baThemeSpinner'
import * as $ from 'jquery';
@Component({
  selector: 'ba-picture-uploader',
  styleUrls: ['./baPictureUploader.scss'],
  templateUrl: './baPictureUploader.html',
})
export class BaPictureUploader {

  @Input() defaultPicture:string = '';
  @Input() picture:string = '';
  
  @Input() uploaderOptions:NgUploaderOptions = { url: '' };
  @Input() canDelete:boolean = true;

  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();

  @ViewChild('fileUpload') public _fileUpload:ElementRef;
  public uploadInProgress:boolean;

  constructor(private renderer: Renderer, private spinner: BaThemeSpinner) {
  }

  beforeUpload(uploadingFile): void {
    let files = this._fileUpload.nativeElement.files;

    if (files.length) {
      const file = files[0];
      this._changePicture(file);

      if (!this._canUploadOnServer()) {
        uploadingFile.setAbort();
      } else {
        this.uploadInProgress = true;
      }
    }
  }

  bringFileSelector():boolean { // when user were click img icon
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  removePicture():boolean {
    this.picture = '';
    return false;
  }

  _changePicture(file:File):void {
    this.spinner.showUploadStatus();
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  _onUploadCompleted(data):void {
    this.spinner.hideUploadStatus();
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }
}
