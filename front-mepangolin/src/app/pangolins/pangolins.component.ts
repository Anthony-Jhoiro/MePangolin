import { Component, OnInit } from '@angular/core';
import {PangolinsService} from "../services/pangolins.service";
import {Observable} from "rxjs";
import {Pangolin} from "../models/Pangolin";
import {FriendsService} from "../services/friends.service";

@Component({
  selector: 'app-pangolins',
  templateUrl: './pangolins.component.html',
  styleUrls: ['./pangolins.component.scss']
})
export class PangolinsComponent implements OnInit {
  pangolins: Pangolin[] = [];
  onlyFriends = false;
  searchItem = "";
  timeOutBeforeSearch: any;


  constructor(
    private pangolinsService: PangolinsService,
    private friendsService: FriendsService
  ) { }

  ngOnInit(): void {
    this.searchPangolins();
  }

  searchPangolins() {
    this.pangolinsService.getPangolins(this.onlyFriends, this.searchItem)
      .subscribe(pangolins => this.pangolins = pangolins);
  }

  /**
   * Called from the template when the button "Que mes amis" is clicked
   * After a 1 second timeout send the request.
   */
  onSearch() {
    // Clear previous time out
    clearTimeout(this.timeOutBeforeSearch)
    // Wait a second before sending the request
    this.timeOutBeforeSearch = setTimeout(() => {
      this.searchPangolins();
    }, 1000);
  }

  addFriend(pangolinId) {
    this.friendsService.addFriend(pangolinId)
      .subscribe(() => this.searchPangolins());
  }

  removeFriend(pangolinId) {
    this.friendsService.removeFriend(pangolinId)
      .subscribe(() => this.searchPangolins());
  }

  toggleOnlyFriends() {
    this.onlyFriends = !this.onlyFriends;
    this.searchPangolins();
  }

}
