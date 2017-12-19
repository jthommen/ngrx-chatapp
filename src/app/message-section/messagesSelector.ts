import { ApplicationState } from "../store/application-state";
import { MessageVM } from "./message.vm";
import * as _ from "lodash";
import { Message } from "../../../shared/model/message";

export function messagesSelector(state:ApplicationState): MessageVM[] {
    const currentThreadId = state.uiState.currentThreadId;
    console.log('Current Thread Id: ' + currentThreadId);

    if(!currentThreadId){
        return [];
    }
    const messageIds = state.storeData.threads[currentThreadId].messageIds;

    const messages = messageIds.map(messageId => state.storeData.messages[messageId]);

    return messages.map(_.partial(mapMessageToMessageVM, state));
}

function mapMessageToMessageVM(state:ApplicationState, message: Message): MessageVM {
    return {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        participantName: state.storeData.participants[message.participantId].name
    };
}