// Library Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Action, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { RouterModule } from '@angular/router';
import * as _ from 'lodash';

// Custom Components
import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// NgRx Imports
import { ThreadsService } from './services/threads.service';
import { LoadThreadsEffectService } from './store/effects/load-threads-effect.service';
import { INITIAL_APPLICATION_STATE, ApplicationState } from './store/application-state';
import { storeData} from './store/reducers/StoreDataReducer';
import { uiState} from './store/reducers/uiStateReducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MessageItemComponent } from './message-item/message-item.component';
import { WriteNewMessageEffectService } from './store/effects/write-new-message-effect.service';
import { ServerNotificationsEffectService } from './store/effects/server-notifications-effect.service';
import { MarkMessageAsReadEffectService } from './store/effects/mark-message-as-read-effect.service';
import { MessagesComponent } from './messages/messages.component';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { routes } from './routes';
import { CustomRouterStateSerializer } from './store/utils';

// Combined reducer & ngrx-storefreeze metareducer
export const reducers: ActionReducerMap<ApplicationState> = {
  uiState,
  storeData,
  routerReducer: routerReducer
};

export const metaReducers = [storeFreeze];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent,
    MessageItemComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers, initialState: INITIAL_APPLICATION_STATE }),
    RouterModule.forRoot(routes, {useHash: true}),    
    StoreRouterConnectingModule,
    EffectsModule.forRoot([
      LoadThreadsEffectService,
      WriteNewMessageEffectService,
      ServerNotificationsEffectService,
      MarkMessageAsReadEffectService]),
    StoreDevtoolsModule.instrument({maxAge: 25})
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    ThreadsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
