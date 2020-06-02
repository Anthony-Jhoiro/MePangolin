import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  addFriend(pangolinId) {
    return this.http.post(environment.API_ENDPOINT + '/friend', { id: pangolinId });
  }

  removeFriend(pangolinId) {
    return this.http.delete(environment.API_ENDPOINT + '/friend/'+pangolinId);
  }

  getFriends() {
    return this.http.get(environment.API_ENDPOINT + '/friend');
  }
}
