import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  static MESSAGE_TIMEOUT_MS = 5000

  add(message: Message) {
    this.messages.push(message);
    setTimeout(() => {
      this.clear()
    }, MessageService.MESSAGE_TIMEOUT_MS)
  }

  clear() {
    this.messages = [];
  }
}