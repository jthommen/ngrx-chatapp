import { Application } from 'express';
import { Message } from '../../../shared/model/message';
import { findThreadById } from '../persistence/findThreadById';
import * as _ from 'lodash';
import { dbMessagesQueuePerUser, dbMessages } from '../db-data';

let messageCounter = 20;

export function apiSaveNewMessage(app: Application){
    
    app.route('/api/threads/:id').post((req,res) => {
        
        // Extract information from request body, params & headers
        const payload = req.body;

        const threadId = parseInt(req.params.id);
        const participantId = parseInt(req.headers['userid']);

        const message: Message = {
            id: messageCounter++,
            threadId,
            timestamp: new Date().getTime(),
            text: payload.text,
            participantId
        };

        // save the message, already linked to the thread
        dbMessages[message.id] = message;

        const thread = findThreadById(threadId);
        thread.messageIds.push(message.id);

        const otherParticipantIds = _.keys(thread.participants).filter(id => parseInt(id) !== participantId);

        otherParticipantIds.forEach(participantId => {
            thread.participants[participantId] += 1;
            dbMessagesQueuePerUser[participantId].push(message.id);
        });

        thread.participants[participantId] = 0;

        res.status(200).send();
    });
}