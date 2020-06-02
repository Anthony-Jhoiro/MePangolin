import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pangolin} from "../models/Pangolin";

@Component({
  selector: 'app-pangolin-detail',
  templateUrl: './pangolin-detail.component.html',
  styleUrls: ['./pangolin-detail.component.scss']
})
export class PangolinDetailComponent implements OnInit {
  /**
   * The pangolin to display
   */
  @Input() pangolin: Pangolin;

  /**
   * EventEmitter to add the pangolin to the connected one friend list
   */
  @Output() addFriend = new EventEmitter<String>();

  /**
   * EventEmitter to remove the pangolin to the connected on friend list
   */
  @Output() removeFriend = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Output the pangolin id to add it as a friend
   */
  friend() {
    this.addFriend.emit(this.pangolin._id);
    this.pangolin.friend = true;
  }

  /**
   * Output the pangolin to remove it from the friend list
   */
  noFriend() {
    this.removeFriend.emit(this.pangolin._id);
    this.pangolin.friend = false;
  }

}
