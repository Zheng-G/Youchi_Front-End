import { Injectable } from '@angular/core';
import { Area } from '../models/area';
import { Series } from '../models/series';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';

@Injectable()
export class AreaService {
    private areasUrl = '/areas';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.areasUrl = config.apiUrl + '/areas';
        this.errorFromServer = "";
    }

    // get("/areas")
    getAreas(): Promise<Area[]> {
      return this.http.get(this.areasUrl)
                 .toPromise()
                 .then(response => response.json() as Area[])
                 .catch(this.handleError);
    }

    // post("/areas")
    createArea(newArea: Area): Promise<any> {
      return this.http.post(this.areasUrl + '/create', newArea, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // delete("/api/contacts/:id")
    deleteArea(delArea: Area): Promise<any> {
      return this.http.delete(this.areasUrl + '/' + delArea._id, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateArea(putArea: Area): Promise<any> {
      var putUrl = this.areasUrl + '/' + putArea._id;
      return this.http.put(putUrl, putArea, this.auth.getHeaders())
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
