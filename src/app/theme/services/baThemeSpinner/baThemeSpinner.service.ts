import {Injectable} from '@angular/core';

@Injectable()
export class BaThemeSpinner {

  private _selector:string = 'preloader';
  private _element:HTMLElement;

  private uploadSelector:string = 'preloader';
  private uploadElement:HTMLElement;

  constructor() {
    this._element = document.getElementById(this._selector);
    this.uploadElement = document.getElementById(this.uploadSelector);
  }

  public show():void {
    this._element.style['display'] = 'block';
    this.uploadElement.style['opacity'] = '1';
  }

  public hide(delay:number = 0):void {
    setTimeout(() => {
      this._element.style['display'] = 'none';
    }, delay);
  }

  public showUploadStatus():void {
    this.uploadElement.style['display'] = 'block';
    this.uploadElement.style['opacity'] = '0.7';
  }

  public hideUploadStatus(delay:number = 0):void {
    setTimeout(() => {
      this.uploadElement.style['display'] = 'none';
    }, delay);
  }
}
