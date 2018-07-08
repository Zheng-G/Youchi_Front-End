import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { Series } from '../models/series';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';

@Injectable()
export class BrandsService {
    private brandsUrl = '/brands';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.brandsUrl = config.apiUrl + '/brands';
        this.errorFromServer = "";
    }

    // get("/brands")
    getBrands(): Promise<Brand[]> {
      return this.http.get(this.brandsUrl)
                 .toPromise()
                 .then(response => response.json() as Brand[])
                 .catch(this.handleError);
    }

    // post("/brands")
    createBrand(newBrand: Brand): Promise<any> {
      return this.http.post(this.brandsUrl + '/create', newBrand, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // get("/brands/:id") 


    // delete("/api/contacts/:id")
    deleteBrand(delBrand: Brand): Promise<any> {
      return this.http.delete(this.brandsUrl + '/' + delBrand._id, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateBrand(putBrand: Brand): Promise<any> {
      var putUrl = this.brandsUrl + '/' + putBrand._id;
      return this.http.put(putUrl, putBrand, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateBrandSeries(putBrand: Brand, putSeries: Series): Promise<any> {

      var putUrl = this.brandsUrl + '/' + putBrand._id;
      if (putBrand["series"]) {
        putBrand["series"].push(putSeries);
      } else {
        putBrand["series"] = [putSeries];
      }

      return this.http.put(putUrl, putBrand, this.auth.getHeaders())
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
