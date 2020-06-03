import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../notification.service";

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

  /**
   * Show a notification for 2 seconds and reduce the opacity for
   * @param message message to display
   * @param state state of the notification (SUCCESS or ERROR)
   */
  showNotification(message: string, state: NotificationState) {
    this.message = message;
    this.state = state;
    this.opacity = 1;
    // CLear timeout and interval
    clearInterval(this.opacityInterval);
    clearTimeout(this.opacityTimeout);

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
