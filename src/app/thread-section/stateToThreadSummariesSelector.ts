import { ApplicationState } from "../store/application-state";
import { Thread } from "../../../shared/model/thread";
import { ThreadSummaryVM } from "./thread-summary.vm";
import * as _ from "lodash";

export function stateToThreadSummariesSelector (state:ApplicationState):ThreadSummaryVM[] {

    const threads = _.values<Thread>(state.storeData.threads);

    return threads.map(_.partial(mapThreadToThreadSummary, state));
}

function mapThreadToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {
      
    // Returns an array of participant names from the thread participant ids
    const names = _.keys(thread.participants).map(participantId => state.storeData.participants[participantId].name);
      
    // Extract last message by id
    const lastMessageId = _.last(thread.messageIds);
      
    const lastMessage = state.storeData.messages[lastMessageId];
      
    return {
    id: thread.id,
      participantNames: _.join(names, ","), // produce list of participant names, separated by comma as a big string
      lastMessageText: state.storeData.messages[lastMessageId].text,
      timestamp: lastMessage.timestamp,
      read: thread.id === state.uiState.currentThreadId || thread.participants[state.uiState.userId] === 0
    }
}