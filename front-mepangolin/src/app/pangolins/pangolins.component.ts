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
  pangolins: Observable<Pangolin[]>;

  constructor(
    private pangolinsService: PangolinsService,
    private friendsService: FriendsService
  ) { }

  ngOnInit(): void {
    this.pangolins = this.pangolinsService.getPangolins();
  }

  addFriend(pangolinId) {
    this.friendsService.addFriend(pangolinId)
      .subscribe();
  }

}
