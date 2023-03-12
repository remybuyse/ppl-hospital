import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
  
@Injectable({
  providedIn: 'root'
})
export class GetService {
  private url = environment.server;
   
  constructor(private httpClient: HttpClient) { }
  
  getDrugs(){
    return this.httpClient.get(this.url + '/drugs');
  }

  getPatients() {
    return this.httpClient.get(this.url + '/patients');
  }
}