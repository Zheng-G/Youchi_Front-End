import { Injectable } from '@angular/core';
import { SuggestiveCar } from '../models/suggestiveCar';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';
@Injectable()
export class SuggestiveCarService {
    private baseUrl = '/suggestiveCar';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.baseUrl = config.apiUrl + '/suggestiveCar';
        this.errorFromServer = "";
    }

    // get("/brands")
    getSuggestions(): Promise<SuggestiveCar[]> {
      return this.http.get(this.baseUrl)
                 .toPromise()
                 .then(response => response.json() as SuggestiveCar[])
                 .catch(this.handleError);
    }

    // post("/brands")
    createSuggestion(newRequest: SuggestiveCar): Promise<any> {
      return this.http.post(this.baseUrl + '/create', newRequest, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // delete("/api/contacts/:id")
    deleteSuggestion(delRequest: SuggestiveCar): Promise<any> {
      return this.http.delete(this.baseUrl + '/' + delRequest._id, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateSuggestion(putRequest: SuggestiveCar): Promise<any> {
      var putUrl = this.baseUrl + '/' + putRequest._id;
      return this.http.put(putUrl, putRequest, this.auth.getHeaders())
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
