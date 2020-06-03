import { Injectable } from '@angular/core';
import {NotificationBubbleComponent, NotificationState} from "./notification-bubble/notification-bubble.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationComponent: NotificationBubbleComponent = null;

  constructor() { }

  /**
   * Set the notification component reference.
   * @param component
   */
  setNotificationComponent(component) {
    this.notificationComponent = component;
  }

  /**
   * Show a notification in the notification-bubble-component
   * @param message message to display
   * @param state state of the message
   */
  showNotification(message: string, state: NotificationState) {
    this.notificationComponent.showNotification(message, state);
  }

}
