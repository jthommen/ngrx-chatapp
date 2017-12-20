import { StoreData } from "../store-data";
import { Action } from "@ngrx/store";
import { 
    USER_THREADS_LOADED_ACTION,
    UserThreadsLoadedAction,
    SEND_NEW_MESSAGE_ACTION,
    SendNewMessageAction, 
    NEW_MESSAGES_RECEIVED_ACTION,
    NewMessagesReceivedAction} from "../actions";
import { ApplicationState } from "../application-state";
import * as _ from "lodash";
import { Message } from "../../../../shared/model/message";

const uuid = require('uuid/V4');


export function storeData(state: StoreData, action: Action) : StoreData {

    switch(action.type) {
        case USER_THREADS_LOADED_ACTION:
          return handleLoadUserThreadsAction(state, <any>action);

        case SEND_NEW_MESSAGE_ACTION:
          return handleSendNewMessageAction(state, <any>action);

        case NEW_MESSAGES_RECEIVED_ACTION:
            return handleNewMessageReceivedAction(state, <any>action);
      
      default:
        return state;
    }


}

// Handler functions to generate the new states
function handleLoadUserThreadsAction(state: StoreData, action: UserThreadsLoadedAction) {
    return {
        participants: _.keyBy(action.payload.participants, 'id'),
        messages: _.keyBy(action.payload.messages, 'id'),
        threads: _.keyBy(action.payload.threads, 'id')
    };

}

function handleSendNewMessageAction(state: StoreData, action: SendNewMessageAction){
    const newStoreState = _.cloneDeep(state); // copies state without referencing to previous state
    const currentThread = state.threads[action.payload.threadId];
    const newMessage: Message = {
        id: uuid(),
        text: action.payload.text,
        threadId: action.payload.threadId,
        timestamp: new Date().getTime(),
        participantId: action.payload.participantId,
    };

    newStoreState.threads[currentThread.id].messageIds.push(newMessage.id); // Add to threads in store

    newStoreState.messages[newMessage.id] = newMessage; // Add messages in store

    return newStoreState;
}

function handleNewMessageReceivedAction(state: StoreData, action: NewMessagesReceivedAction) {
    const newStoreState = _.cloneDeep(state);
    const newMessages = action.payload;
    
    newMessages.forEach(message => {
        newStoreState.messages[message.id] = message;
        newStoreState.threads[message.threadId].messageIds.push(message.id);
    });

    return newStoreState;
}