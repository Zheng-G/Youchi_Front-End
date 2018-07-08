import { Injectable } from '@angular/core';
import { FAQ } from '../models/faq';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ApiService } from './api.service';
@Injectable()
export class FAQService {
    private faqsUrl = '/faqs';
    public errorFromServer: string = "";
    
    constructor (private http: Http, private config: AppConfig, private auth: ApiService) {
        this.faqsUrl = config.apiUrl + '/faqs';
        this.errorFromServer = "";
    }

    // get("/areas")
    getFAQs(): Promise<FAQ[]> {
      return this.http.get(this.faqsUrl)
                 .toPromise()
                 .then(response => response.json() as FAQ[])
                 .catch(this.handleError);
    }

    // post("/areas")
    createFAQ(newFAQ: FAQ): Promise<any> {
      return this.http.post(this.faqsUrl + '/create', newFAQ, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // get("/areas/:id") 


    // delete("/api/contacts/:id")
    deleteFAQ(delFAQ: FAQ): Promise<any> {
      return this.http.delete(this.faqsUrl + '/' + delFAQ._id, this.auth.getHeaders())
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateFAQ(putFAQ: FAQ): Promise<any> {
      var putUrl = this.faqsUrl + '/' + putFAQ._id;
      return this.http.put(putUrl, putFAQ, this.auth.getHeaders())
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
