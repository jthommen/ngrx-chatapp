// Smart component for the thread section

import { Component, OnInit } from '@angular/core';

import { ThreadsService } from '../services/threads.service';
import { Thread } from '../../../shared/model/thread';
import { ThreadSummaryVM } from './thread-summary.vm';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { UserThreadsLoadedAction, LoadUserThreadsAction, ThreadSelectedAction } from '../store/actions';
import { userNameSelector } from './userNameSelector';
import { mapStateToUnreadMessagesCounter } from './mapStateToUnreadMessagesCounter';
import { stateToThreadSummariesSelector } from './stateToThreadSummariesSelector';

import { Observable } from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  // Observables our template subscribes to with async pipe
  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private store: Store<ApplicationState>) { // Store injected

      // Mapping application state to the view model with selector functions
      this.userName$ = store
        .map(userNameSelector);

      this.unreadMessagesCounter$ = store
        .map(mapStateToUnreadMessagesCounter);

      this.threadSummaries$ = store
        .select(stateToThreadSummariesSelector);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserThreadsAction());
  }

  onThreadSelected(selectedThreadId: number){
    this.store.dispatch(new ThreadSelectedAction(selectedThreadId));
  }

}
