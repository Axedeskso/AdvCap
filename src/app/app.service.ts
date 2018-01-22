import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { World } from './world';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  url = "http://localhost:8080/AdvCapS/webresources/world-json";

  constructor(private http: HttpClient) { }

  getWorld(){
    return this.http.get<World>(this.url);
  }

  //getIpAdress(){
    //return this.http.get('http://freegeoip.net/json/?callback');
  //}

}