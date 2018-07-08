import { Injectable } from '@angular/core';
import { TestCategory } from '../models/testCategory';
import { Series } from '../models/series';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';
@Injectable()
export class TestItemService {
    private areasUrl = '/testItems';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.areasUrl = config.apiUrl + '/testItems';
        this.errorFromServer = "";
    }

    // get("/areas")
    getTestItems(): Promise<TestCategory[]> {
      return this.http.get(this.areasUrl)
                 .toPromise()
                 .then(response => response.json() as TestCategory[])
                 .catch(this.handleError);
    }

    // post("/areas")
    createItem(newItem: TestCategory): Promise<any> {
      return this.http.post(this.areasUrl + '/create', newItem, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // get("/areas/:id") 


    // delete("/api/contacts/:id")
    deleteItem(delItem: TestCategory): Promise<any> {
      return this.http.delete(this.areasUrl + '/' + delItem._id, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateItem(putItem: TestCategory): Promise<any> {
      var putUrl = this.areasUrl + '/' + putItem._id;
      return this.http.put(putUrl, putItem, this.auth.getHeaders())
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
