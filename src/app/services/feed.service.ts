import { Injectable } from '@angular/core';
import { FEED } from '../models/feed';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';
@Injectable()
export class FEEDService {
    private feedsUrl = '/feedback';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.feedsUrl = config.apiUrl + '/feedback';
        this.errorFromServer = "";
    }

    // get("/areas")
    getFEED(): Promise<FEED[]> {
      return this.http.get(this.feedsUrl)
                 .toPromise()
                 .then(response => response.json() as FEED[])
                 .catch(this.handleError);
    }


    // delete("/api/contacts/:id")
    deleteFEED(feedback: FEED): Promise<any> {
      return this.http.delete(this.feedsUrl + '/' + feedback._id, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      console.log("error", error);
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      window.alert(error._body ? error._body : errMsg);
    }

}
