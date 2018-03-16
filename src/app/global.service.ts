import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { World } from './world';

@Injectable()
export class GlobalService {

  url = "http://localhost:8080/AdvCapS/";
  user = "";

  constructor(private http: Http) {
  };

  getServeur(){
    return this.url;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
  getWorld(): Promise<World> {
    return this.http.get(this.url + "webresources/world", {headers: this.setHeaders(this.user)}).toPromise().then(response => response.json()).catch(this.handleError);
  };

  private setHeaders(user: string): Headers {
    var headers = new Headers();
    headers.append("X-User", user);
    return headers;
  }

}