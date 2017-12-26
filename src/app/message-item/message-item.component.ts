import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MessageVM } from '../message-section/message.vm';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent {

  @Input()
  message: MessageVM;

}
