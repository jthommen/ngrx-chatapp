import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ThreadsService } from "../../services/threads.service";
import { Effect } from "@ngrx/effects";
import { NewMessagesReceivedAction } from "../actions";
import { ApplicationState } from "../application-state";
import { Store } from "@ngrx/store";
import { uiState } from "../reducers/uiStateReducer";

@Injectable()
export class ServerNotificationsEffectService {

    constructor( 
        private threadsService: ThreadsService,
        private store: Store<ApplicationState>){}

    @Effect() newMessages$ = Observable.interval(3000)
        .withLatestFrom(this.store.select('uiState'))
        .map(([any, uiState]) => uiState)
        .filter((uiState:any) => uiState.userId)
        .switchMap(uiState => this.threadsService.loadNewMessagesForUser(uiState.userId))
        .filter((messages) => messages.length > 0)
        .debug('new messages for user from server')
        .withLatestFrom(this.store.select('uiState'))
        .map(([messages,uiState]) => new NewMessagesReceivedAction({
            unreadMessages:messages,
            currentThreadId: uiState.currentThreadId,
            currentUserId: uiState.userId
        }));
}
