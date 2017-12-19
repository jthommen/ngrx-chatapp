import { Component, Input } from '@angular/core';
import { MessageVM } from '../message-section/message.vm';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {

  constructor() { }

  @Input()
  message: MessageVM;

}
