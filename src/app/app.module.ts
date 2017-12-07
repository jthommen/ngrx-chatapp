import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Action } from '@ngrx/store';


import { AppComponent } from './app.component';

import * as _ from 'lodash';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadsService } from './services/threads.service';
import { INITIAL_APPLICATION_STATE, ApplicationState } from './store/application-state';
import { LOAD_USER_THREADS_ACTION, LoadUserThreadsAction } from './store/actions';
import { storeData } from './store/reducers/uiStoreDataReducer';
import { uiState } from './store/reducers/uiStateReducer';

export const reducers = {
  uiState,
  storeData
};

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {initialState: INITIAL_APPLICATION_STATE })
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
