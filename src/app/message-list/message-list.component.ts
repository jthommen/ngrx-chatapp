import { 
  Component, 
  OnChanges, 
  Input, 
  ElementRef, 
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MessageVM } from '../message-section/message.vm';
import * as _ from 'lodash';
import { ApplicationState } from '../store/application-state';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnChanges {

  @Input()
  messages: MessageVM[] = [];

  // For scroll to last message functionality
  @ViewChild('list')
  list: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
      if(changes['messages'] && changes['messages'].currentValue.length !== 0) {
        const previousMessages = changes['messages'].previousValue;
        const newMessages = changes['messages'].currentValue;

        if(newMessages.length > previousMessages.length){
          setTimeout(() => { // Workaround to let angular render the new message before putting it into view
            this.scrollLastMessageIntoView();
          });
        }
      }
  }

  scrollLastMessageIntoView() {
    const items = this.list.nativeElement.querySelectorAll('li'); // DOM api
    const lastItem: any = _.last(items);
    if(lastItem){
      lastItem.scrollIntoView(); // DOM api
    }
  }

}
