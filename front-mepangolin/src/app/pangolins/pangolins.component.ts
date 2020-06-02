import { Component, OnInit } from '@angular/core';
import {PangolinsService} from "../services/pangolins.service";
import {Pangolin} from "../models/Pangolin";
import {FriendsService} from "../services/friends.service";
import {faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-pangolins',
  templateUrl: './pangolins.component.html',
  styleUrls: ['./pangolins.component.scss']
})
export class PangolinsComponent implements OnInit {
  /**
   * List of pangolins to display
   */
  pangolins: Pangolin[] = [];

  /**
   * Boolean to filter the pangolin list to have only the friends ones
   */
  onlyFriends = false;

  /**
   * content of the input[text]
   */
  searchItem = "";

  /**
   * TimeOut before searching for new pangolins
   */
  timeOutBeforeSearch: any;

  // Icons :
  userIcon = faUser;
  searchIcon = faSearch


  constructor(
    private pangolinsService: PangolinsService,
    private friendsService: FriendsService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.searchPangolins();
  }

  /**
   * Call the service to get the list of pangolins to display
   */
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

  /**
   * Call the service to add the given pangolin to the connected one friend list.
   * @param pangolinId the id of the pangolin to add
   */
  addFriend(pangolinId) {
    this.friendsService.addFriend(pangolinId)
      .subscribe(() => this.searchPangolins());
  }

  /**
   * Call the service to remove the given pangolin from the connected one friend list.
   * It is sad but sometime you have to say goodbye
   * @param pangolinId
   */
  removeFriend(pangolinId) {
    this.friendsService.removeFriend(pangolinId)
      .subscribe(() => this.searchPangolins());
  }

  /**
   * toggle this.onlyFriends and start a new search to update the list
   */
  toggleOnlyFriends() {
    this.onlyFriends = !this.onlyFriends;
    this.searchPangolins();
  }

  /**
   * Call the service to logout the current pangolin
   */
  logout() {
    this.authenticationService.logout()
  }

}
