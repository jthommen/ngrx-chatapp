// Library Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Action } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import * as _ from 'lodash';

// Custom Components
import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';

// NgRx Imports
import { ThreadsService } from './services/threads.service';
import { LoadThreadsEffectService } from './store/effects/load-threads-effect.service';
import { INITIAL_APPLICATION_STATE } from './store/application-state';
import { storeData } from './store/reducers/uiStoreDataReducer';
import { uiState } from './store/reducers/uiStateReducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    StoreModule.forRoot(reducers, {initialState: INITIAL_APPLICATION_STATE }),
    EffectsModule.forRoot([LoadThreadsEffectService]),
    StoreDevtoolsModule.instrument({maxAge: 25})
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
