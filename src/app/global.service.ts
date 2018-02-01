import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { World } from './world';

@Injectable()
export class GlobalService {

  url = "http://localhost:8080/AdvCapS/";

  constructor(private http: HttpClient) { }

  getWorld(){
    return this.http.get<World>(this.url + "webresources/world-json");
  }
}