import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Pangolin} from "../models/Pangolin";

@Injectable({
  providedIn: 'root'
})
export class PangolinsService {

  constructor(private http: HttpClient) { }

  getPangolins(onlyFriends: boolean, searchItem: string) {
    const query = environment.API_ENDPOINT + '/pangolins?searchItem='+searchItem+'&onlyFriends='+((onlyFriends)?'1':'0');
    return this.http.get<Pangolin[]>(encodeURI(query));
  }
}
