import { Injectable } from '@angular/core';
import { CarType } from '../models/carType';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';
@Injectable()
export class CarTypeService {
    private carTypeUrl = '/carTypes';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.carTypeUrl = config.apiUrl + '/carTypes';
        this.errorFromServer = "";
    }

    // get("/brands")
    getCarTypes(): Promise<CarType[]> {
      return this.http.get(this.carTypeUrl)
                 .toPromise()
                 .then(response => response.json() as CarType[])
                 .catch(this.handleError);
    }

    // post("/brands")
    createCarType(newCarType: CarType): Promise<any> {
      return this.http.post(this.carTypeUrl + '/create', newCarType, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // get("/brands/:id") 


    // delete("/api/contacts/:id")
    deleteCarType(delCarType: CarType): Promise<any> {
      return this.http.delete(this.carTypeUrl + '/' + delCarType['_id'], this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateCarType(putCarType: CarType): Promise<any> {
      var putUrl = this.carTypeUrl + '/' + putCarType['_id'];
      return this.http.put(putUrl, putCarType, this.auth.getHeaders())
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
