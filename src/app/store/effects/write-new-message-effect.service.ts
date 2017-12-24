import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { ThreadsService } from "../../services/threads.service";
import { 
    SendNewMessageAction, 
    SEND_NEW_MESSAGE_ACTION, 
    ErrorOccuredAction, 
    LogMessageAction} from "../actions";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";



@Injectable()
export class WriteNewMessageEffectService {
    constructor(private actions$: Actions, private threadService: ThreadsService){}
    
    @Effect() newMessages$: Observable<any> = this.actions$
        .ofType<SendNewMessageAction>(SEND_NEW_MESSAGE_ACTION)
        .switchMap(action => this.threadService.saveNewMessage(action.payload))
        .map(data => new LogMessageAction()) // Action to satisfy dispatch in effect decorator
        .catch( () => Observable.of(new ErrorOccuredAction('Error occured while saving message')) );
}