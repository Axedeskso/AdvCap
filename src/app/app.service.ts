import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { World } from './world';

@Injectable()
export class AppService {

  url = "http://localhost:8080/AdvCapS/webresources/world-json";

  constructor(private http: HttpClient) { }

  getWorld(){
    return this.http.get<World>(this.url);
  }
}