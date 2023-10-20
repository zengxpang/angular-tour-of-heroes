import { Component } from '@angular/core';

import {MessageService} from "../message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  // Angular 只会绑定到组件的公共属性。
  constructor(public messageService: MessageService) {}
}
