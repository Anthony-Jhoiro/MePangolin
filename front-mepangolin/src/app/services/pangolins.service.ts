import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Pangolin} from "../models/Pangolin";

@Injectable({
  providedIn: 'root'
})
export class PangolinsService {

  constructor(private http: HttpClient) { }

  getPangolins() {
    return this.http.get<Pangolin[]>(environment.API_ENDPOINT + '/pangolins');
  }
}
