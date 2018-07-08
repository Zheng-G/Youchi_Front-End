import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";

import {Observable} from 'rxjs/Rx';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';
declare var $: any;

@Injectable()
export class HttpClient {
  requestUrl: string;
  responseData: any;
  handleError: any;

  constructor(  private router: Router, private http: Http, private apiConfig: AppConfig, private api: ApiService) {
    this.http = http;
  }
 
  postWithFile (url: string, postData: any, files: File[]) {
    if (postData.type == "Third") {
        console.log('see here', postData);
    }
     
    let formData:any = new FormData();

    if (files.length == 1) {
      formData.append(`name`, files[0].name);
      formData.append(`uploads`, files[0], files[0].name);
    }
    else {
      for (let i = 0; i < files.length; i++) {
          formData.append(`uploads`, files[i], files[i].name);
      }
    }

    if(postData !=="" && postData !== undefined && postData !==null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    let options = this.api.getHeaders();
    var returnReponse = new Promise((resolve, reject) => {
      this.http.post(this.apiConfig.apiUrl + url, formData, options)
        .subscribe(
          res => {
            this.responseData = res.json();
            // this.responseData = res.json().imagePath[0].imagePath;
            // console.log(this.responseData, 'reply from server.Have a look carefully');
            resolve(this.responseData);
          },
          error => {
            console.log('image uploader response : ', error);
            // reject(error);
          }
      );
    });
    return returnReponse;
  }
}
