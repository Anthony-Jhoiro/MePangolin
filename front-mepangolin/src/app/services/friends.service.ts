import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Pangolin} from "../models/Pangolin";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  /**
   * Call the API to add a pangolin to the current pangolin friends list
   * @param pangolinId
   */
  addFriend(pangolinId) {
    return this.http.post(environment.API_ENDPOINT + '/friend', { id: pangolinId });
  }

  /**
   * Call the API to remove a pangolin to the current pangolin friends list
   * @param pangolinId pangolin to remove
   */
  removeFriend(pangolinId) {
    return this.http.delete(environment.API_ENDPOINT + '/friend/'+pangolinId);
  }

  /**
   * Call the api to create a friend pangolin account
   * @param pangolin
   */
  createFriend(pangolin: Pangolin): Observable<any> {
    return this.http.post(environment.API_ENDPOINT+'/friend/create', pangolin);
  }
}
