import { ApplicationState } from "../store/application-state";
import { Thread } from "../../../shared/model/thread";
import * as _ from "lodash";

export function  mapStateToUnreadMessagesCounter(state: ApplicationState): number {
    
    const currentUserId = state.uiState.userId;
    
    return _.values<Thread>(state.storeData.threads) // convertint into array of Threads
      .reduce(
        (acc, thread) => acc + (thread.participants[currentUserId] || 0) // accumulate counter of unread threads for certain user
      ,0);

}