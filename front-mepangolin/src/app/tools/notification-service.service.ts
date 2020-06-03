import { Injectable } from '@angular/core';
import {NotificationBubbleComponent, NotificationState} from "./notification-bubble/notification-bubble.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationComponent: NotificationBubbleComponent = null;

  constructor() { }

  setNotificationComponent(component) {
    this.notificationComponent = component;
  }

  showNotification(message: string, state: NotificationState) {
    this.notificationComponent.showNotification(message, state);
  }

}
