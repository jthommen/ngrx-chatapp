import { StoreData } from "../store-data";
import { Action } from "@ngrx/store";
import { LOAD_USER_THREADS_ACTION, LoadUserThreadsAction } from "../actions";
import { ApplicationState } from "../application-state";
import * as _ from "lodash";


export function storeData(state: StoreData, action: Action) : StoreData {

    switch(action.type) {
        case LOAD_USER_THREADS_ACTION:
          return handleLoadUserThreadsAction(state, <any>action);
      
      default:
        return state;
      }


}

function handleLoadUserThreadsAction(state: StoreData, action: LoadUserThreadsAction) {
    return {
        participants: _.keyBy(action.payload.participants, 'id'),
        messages: _.keyBy(action.payload.messages, 'id'),
        threads: _.keyBy(action.payload.threads, 'id')
    };

}