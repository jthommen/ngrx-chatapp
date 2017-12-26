import { StoreData } from "../store-data";
import { Action } from "@ngrx/store";
import { 
    USER_THREADS_LOADED_ACTION,
    UserThreadsLoadedAction,
    SEND_NEW_MESSAGE_ACTION,
    SendNewMessageAction, 
    NEW_MESSAGES_RECEIVED_ACTION,
    NewMessagesReceivedAction,
    THREAD_SELECTED_ACTION,
    ThreadSelectedAction} from "../actions";
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

        case THREAD_SELECTED_ACTION:
            return handleThreadSelectedAction(state, <any>action);
      
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
    
    // Optimize for onPush changeDetection
    // Pointing to non-modified data by reference
    // copying modified data onto new object.
    // Leads to performance improvements for Angular change detection using OnPush
    
    const newStoreState: StoreData = {
        participants: state.participants,
        threads: Object.assign({}, state.threads),
        messages: Object.assign({}, state.messages)
    };

    // Create copy of current Thread
    newStoreState.threads[action.payload.threadId] = Object.assign({}, state.threads[action.payload.threadId]);

    const currentThread = newStoreState.threads[action.payload.threadId];

    const newMessage: Message = {
        id: uuid(),
        text: action.payload.text,
        threadId: action.payload.threadId,
        timestamp: new Date().getTime(),
        participantId: action.payload.participantId,
    };

    currentThread.messageIds = currentThread.messageIds.slice(0); // Copy of messages before modifying them
    currentThread.messageIds.push(newMessage.id);

    newStoreState.messages[newMessage.id] = newMessage; // Add messages in store

    return newStoreState;
}

function handleNewMessageReceivedAction(state: StoreData, action: NewMessagesReceivedAction) {

    const newStoreState: StoreData = {
        participants: state.participants,
        threads: _.clone(state.threads),
        messages: _.clone(state.messages)
    };

    const newMessages = action.payload.unreadMessages;
    const currentThreadId = action.payload.currentThreadId;
    const currentUserId = action.payload.currentUserId;
    
    newMessages.forEach(message => {
        newStoreState.messages[message.id] = message;

        // Create new object by reference
        newStoreState.threads[message.threadId] = _.clone(newStoreState.threads[message.threadId]);
        
        const messageThread = newStoreState.threads[message.threadId];

        // Copy changed object by value
        messageThread.messageIds = _.clone(messageThread.messageIds);
        
        // Adding new message id to copied object
        messageThread.messageIds.push(message.id);

        // Populate unread messages counter
        if(message.threadId !== currentThreadId){
            messageThread.participants = _.clone(newStoreState.threads[message.threadId].participants);
            messageThread.participants[currentUserId] += 1;
        }
    });

    return newStoreState;
}

function handleThreadSelectedAction(state: StoreData, action: ThreadSelectedAction){

    const newStoreState: StoreData = {
        participants: _.clone(state.participants),
        threads: _.clone(state.threads),
        messages: _.clone(state.messages)
    };

    newStoreState.threads[action.payload.selectedThreadId] = _.clone(state.threads[action.payload.selectedThreadId]);

    const currentThread = newStoreState.threads[action.payload.selectedThreadId];

    currentThread.participants = _.clone(currentThread.participants);

    // Set unread messages of current user for selected thread to zero
    currentThread.participants[action.payload.currentUserId] = 0;
    
    return newStoreState;
}
