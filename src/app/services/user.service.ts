import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Series } from '../models/series';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { ProfileService } from './profile.service';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
    private usersUrl = '/users';
    public errorFromServer: string = "";
    private options: any;
    constructor (private http: Http, private config: AppConfig, private api: ApiService) {
        this.usersUrl = config.apiUrl + '/users';
        this.errorFromServer = "";
         let headers = new Headers();
          headers.append("Authorization", this.api.getToken());
          this.options = new RequestOptions({headers: headers});
    }

    // get("/users")
    getUsers(): Promise<User[]> {
      return this.http.get(this.usersUrl, this.options)
                 .toPromise()
                 .then(response => response.json() as User[])
                 .catch(this.handleError);
    }

    // post("/users")
    createUser(newUser: User): Promise<any> {
      // var profileImage = newUser.profileImage;
      // var profileImageArr = profileImage.split('/');
      // profileImageArr.splice(0, 3);
      // newUser.profileImage = profileImageArr.join('/');


      return this.http.post(this.usersUrl + '/create?token=' + this.api.getToken(), newUser)
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // get("/users/:id") 


    // delete("/api/contacts/:id")
    deleteUser(delUser: User): Promise<any> {
      return this.http.delete(this.usersUrl + '/' + delUser._id, this.options)
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id") 
    updateUser(putUser: User): Promise<any> {
      // var profileImage = putUser.profileImage;
      // var profileImageArr = profileImage.split('/');
      // profileImageArr.splice(0, 3);
      // putUser.profileImage = profileImageArr.join('/');
      
      var putUrl = this.usersUrl + '/' + putUser._id;
      return this.http.put(putUrl, putUser, this.options)
                 .toPromise()
                 .then(response => response)
                 .catch(this.handleError);
    }


    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      window.alert(error._body ? error._body : errMsg);
    }

}
