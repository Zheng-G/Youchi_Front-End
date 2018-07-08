import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Series } from '../models/series';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';
@Injectable()
export class SellCarService {
    private apiUrl = '/sellcars';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.apiUrl = config.apiUrl + '/sellcars';
        this.errorFromServer = "";
    }

    getSellCars(): Promise<Car[]> {
      return this.http.get(this.apiUrl)
                 .toPromise()
                 .then(response => response.json() as Car[])
                 .catch(this.handleError);
    }

    // post("/cars")
    createSellcar(newCar): Promise<any> {
      console.log('create new car: ' , newCar);
      return this.http.post(this.apiUrl + '/create', newCar, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // get("/cars/:id") 
    getSellCar(carId): Promise<any> {
        return this.http.get(this.apiUrl + '/' + carId)
                   .toPromise()
                   .then(response => response)
                   .catch(this.handleError);
    }


    // delete("/cars/:id")
    deleteSellcar(delCar: Car): Promise<any> {
      return this.http.delete(this.apiUrl + '/' + delCar._id, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // delete("/cars/:id")
    deleteSellcarById(delCarId: Car): Promise<any> {
      return this.http.delete(this.apiUrl + '/' + delCarId, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/cars/:id")
    updateCar(putCar): Promise<any> {
      var putUrl = this.apiUrl + '/' + putCar._id;
      return this.http.put(putUrl, putCar, this.auth.getHeaders())
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
