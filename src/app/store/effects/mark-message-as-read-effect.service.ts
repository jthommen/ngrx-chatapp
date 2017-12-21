import { Injectable } from "@angular/core";
import { ThreadsService } from "../../services/threads.service";
import { THREAD_SELECTED_ACTION, ThreadSelectedAction } from "../actions";
import { Actions, Effect } from "@ngrx/effects";

@Injectable()
export class MarkMessageAsReadEffectService {

    constructor(private action$: Actions, private threadsService: ThreadsService){ }

    @Effect({dispatch: false}) markMessageAsRead$ = this.action$.ofType(THREAD_SELECTED_ACTION)
        .switchMap((action:ThreadSelectedAction) => this.threadsService.markMessagesAsRead(
            action.payload.currentUserId, action.payload.selectedThreadId));
}