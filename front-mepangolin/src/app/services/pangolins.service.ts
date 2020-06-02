import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Pangolin} from "../models/Pangolin";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PangolinsService {

  constructor(private http: HttpClient) { }

  /**
   * Call the API to get the pangolins list with the given filters
   * @param onlyFriends search only in the friends list
   * @param searchItem search by name
   */
  getPangolins(onlyFriends: boolean, searchItem: string): Observable<Pangolin[]> {
    const query = environment.API_ENDPOINT + '/pangolins?searchItem='+searchItem+'&onlyFriends='+((onlyFriends)?'1':'0');
    return this.http.get<Pangolin[]>(encodeURI(query));
  }

  /**
   * Call the API to get the current pangolin profile
   */
  getProfile(): Observable<Pangolin> {
    return this.http.get<Pangolin>(encodeURI(environment.API_ENDPOINT + '/pangolin/profile'))
  }
}
