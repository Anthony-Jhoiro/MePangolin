import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PangolinsService {

  constructor(private http: HttpClient) { }

  getPangolins() {
    return this.http.get(environment.API_ENDPOINT + '/pangolins');
  }
}
