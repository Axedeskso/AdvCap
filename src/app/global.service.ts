import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { World } from './world';
import { Pallier } from './pallier';
import { Product } from './product';

@Injectable()
export class GlobalService {

  url = "http://localhost:8080/AdvCapS/";
  geneWbR = "webresources/";
  user = "";

  constructor(private http: Http) {
  };

  getServeur() {
    return this.url;
  }

  getUser(){
    return this.user;
  }
  setUser(user){
    this.user=user;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getWorld(): Promise<World> {
    return this.http.get(this.url + this.geneWbR + "world", { headers: this.setHeaders(this.user) }).toPromise().then(response => response.json()).catch(this.handleError);
  };

  private setHeaders(user: string): Headers {
    var headers = new Headers();
    headers.append("X-User", user);
    return headers;
  }

  putProduct(product: Product) {
    return this.http.put(this.url + this.geneWbR + "product", product, { headers: this.setHeaders(this.user) }).toPromise();
  }
  putManager(manager: Pallier) {
    return this.http.put(this.url + this.geneWbR + "manager", manager, { headers: this.setHeaders(this.user) }).toPromise();
  }
  putUpgrade(upgrade: Pallier) {
    return this.http.put(this.url + this.geneWbR + "upgrade", upgrade, { headers: this.setHeaders(this.user) }).toPromise();
  }
  putAngel(angel: Pallier) {
    return this.http.put(this.url + this.geneWbR + "angelupgrade", angel, { headers: this.setHeaders(this.user) }).toPromise();
  }
  deleteWorld(){
    return this.http.delete(this.url + this.geneWbR + "world", { headers: this.setHeaders(this.user)} );
  }
}