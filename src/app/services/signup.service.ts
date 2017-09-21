import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class SignupService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  createUserAccount(account) {
    return this.http
      .post('http://localhost:4200/signup', {
        "id": account.email, "password": account.password, 
        "firstname": account.name, "lastname": "", "timezone": "1",
        "name":account.username, "tenantId":account.tenantId
      }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveUser(account) {
    return this.http
    .post('http://localhost:4200/api/user', {
      "id": account.email, "password": account.password, 
      "firstname": account.name, "lastname": "", "timezone": "1",
      "name":account.username, "tenantId":account.tenantId
    }, this.options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  saveTenant(tenant) {
    return this.http
      .post('http://localhost:4200/api/tenant', tenant, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
