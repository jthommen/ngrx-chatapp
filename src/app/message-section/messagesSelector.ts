import { ApplicationState } from "../store/application-state";
import { MessageVM } from "./message.vm";
import * as _ from "lodash";
import { Message } from "../../../shared/model/message";
import { Participant } from "../../../shared/model/participant";
import { createSelector } from 'reselect';

// Structure needed for reselect library (reactjs/reselect)
// Getter functions
// Mapping function combining output of getters

// Combiner is  only called when getter are returning different outputs
export const messagesSelector = createSelector(
    getParticipants, 
    getMessagesForCurrentThread, 
    mapMessagesToMessageVM);

// Getter function for implementing selectors with memoization
function getMessagesForCurrentThread(state: ApplicationState): Message[] {
    const currentThread = state.storeData.threads[state.uiState.currentThreadId];

    return currentThread ? currentThread.messageIds.map(messageId => state.storeData.messages[messageId]) : [];
}

function getParticipants(state: ApplicationState) {
    return state.storeData.participants;
}

// Mapping functions
function mapMessagesToMessageVM(participants: {[key:number]: Participant}, messages: Message[]){
    return messages.map(message => {

        const participantName = participants[message.participantId].name;

        return mapMessageToMessageVM(participantName, message)
    });
}

// Memoized version
// Comparing input references if the same as previous, serve cached output
const mapMessageToMessageVM = _.memoize((participantName: string, message: Message): MessageVM => {
    
    // Implementing Memoization from functional programming
    // First time function is run, output is saved in memo
    // Second+ time funciton is run, only differences are added and returned
    return {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        participantName: participantName
    };
}
,
    // Generating key of the cache for the memoized function
    (participantName: string, message: Message) => message.id + participantName
);
