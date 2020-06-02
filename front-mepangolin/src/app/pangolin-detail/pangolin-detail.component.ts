import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pangolin} from "../models/Pangolin";

@Component({
  selector: 'app-pangolin-detail',
  templateUrl: './pangolin-detail.component.html',
  styleUrls: ['./pangolin-detail.component.scss']
})
export class PangolinDetailComponent implements OnInit {
  @Input() pangolin: Pangolin;
  @Output() addFriend = new EventEmitter<String>();
  @Output() removeFriend = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  friend() {
    this.addFriend.emit(this.pangolin._id);
    this.pangolin.friend = true;
  }

  noFriend() {
    this.removeFriend.emit(this.pangolin._id);
    this.pangolin.friend = false;
  }

}
