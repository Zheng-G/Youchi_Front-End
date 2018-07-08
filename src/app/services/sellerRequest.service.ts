import { Injectable } from '@angular/core';
import { SellerRequest } from '../models/sellerRequest';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';
@Injectable()
export class SellerRequestService {
    private baseUrl = '/seller';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.baseUrl = config.apiUrl + '/seller';
        this.errorFromServer = "";
    }

    // get("/brands")
    getRequests(): Promise<SellerRequest[]> {
      return this.http.get(this.baseUrl)
                 .toPromise()
                 .then(response => response.json() as SellerRequest[])
                 .catch(this.handleError);
    }

    // post("/brands")
    createRequest(newRequest: SellerRequest): Promise<any> {
      return this.http.post(this.baseUrl + '/create', newRequest, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // get("/brands/:id") 


    // delete("/api/contacts/:id")
    deleteRequest(delRequest: SellerRequest): Promise<any> {
      return this.http.delete(this.baseUrl + '/' + delRequest._id, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateRequest(putRequest: SellerRequest): Promise<any> {
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
