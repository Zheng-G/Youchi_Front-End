import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ProfileService } from './profile.service';
import { ApiService } from './api.service';

@Injectable()
export class ManagerService {
    private apiEndpoint = '/managers';
    public errorFromServer: string = "";
    private options: any;
    constructor (private http: Http, private config: AppConfig, private api: ApiService) {
        this.apiEndpoint = config.apiUrl + '/managers';
        this.errorFromServer = "";
         let headers = new Headers();
          headers.append("Authorization", this.api.getToken());
          this.options = new RequestOptions({headers: headers});
    }

    getManagers(): Promise<any[]> {
      return this.http.get(this.apiEndpoint, this.options)
                 .toPromise()
                 .then(response => response.json() as any[])
                 .catch(this.handleError);
    }

    // post("/managers/add")
    createManager(data: any): Promise<any> {
      console.log(data);
      return this.http.post(this.apiEndpoint + '/add?token=' + this.api.getToken(), data)
                 .toPromise()
                 .then(response => response.json())
                 .catch(this.handleError);
    }


    // delete("/managers/:id")
    deleteManager(delManager: any): Promise<any> {
      return this.http.delete(this.apiEndpoint + '/' + delManager._id, this.options)
                 .toPromise()
                 .then(response => response.json())
                 .catch(this.handleError);
    }

    // put("/managers/edit")
    editManager(data: any): Promise<any> {
      return this.http.post(this.apiEndpoint + '/edit?token=' + this.api.getToken(), data)
                 .toPromise()
                 .then(response => response.json())
                 .catch(this.handleError);
    }


    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      window.alert(error._body ? error._body : errMsg);
    }

}
