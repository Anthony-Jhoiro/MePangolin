import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../notification-service.service";

export enum NotificationState {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

@Component({
  selector: 'app-notification-bubble',
  templateUrl: './notification-bubble.component.html',
  styleUrls: ['./notification-bubble.component.scss']
})
export class NotificationBubbleComponent implements OnInit {
  message = "coucou c'est moi moumou la reine des mouettes !";
  state: NotificationState;
  show = true;

  opacityInterval: any;
  opacityTimeout: any;

  opacity = 0;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.setNotificationComponent(this);
  }

  showNotification(message: string, state: NotificationState) {
    this.message = message;
    this.state = state;
    this.opacity = 1;
    clearInterval(this.opacityInterval);

    this.opacityTimeout = setTimeout(() => {
      this.opacityInterval = setInterval(() => {
        this.opacity -= .05;
        if (this.opacity <= 0) {
          clearInterval(this.opacityInterval);
        }
      }, 100);
    }, 2000)

  }

}
