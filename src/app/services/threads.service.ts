import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AllUserData } from '../../../shared/to/all-user-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SendNewMessageActionPayload } from '../store/actions';
import { commonHttpHeaders } from './commonHttpHeaders';
import { Message } from '../../../shared/model/message';

@Injectable()
export class ThreadsService {

  constructor(private http: HttpClient) { }

  // Observable of composed type that is returned by mocked API
  // TO (transfer object) is used to specify type to be returned
  loadUserThreads(userId:number): Observable<AllUserData> { 
    return this.http.get<AllUserData>('/api/threads', commonHttpHeaders(userId));
  }

  // Sends message on the server
  saveNewMessage(payload: SendNewMessageActionPayload): Observable<any> {
    return this.http.post<any>(
      `/api/threads/${payload.threadId}`,
      JSON.stringify({text: payload.text}),
      commonHttpHeaders(payload.participantId));
  }

  // Load new messages for different user
  loadNewMessagesForUser(userId:number): Observable<Message[]> {
    return this.http.post<any>('/api/notifications/messages', null, commonHttpHeaders(userId))
    .map(res => res.payload);
  }

  markMessagesAsRead(userId: number, threadId: number):Observable<any>{
    return this.http.patch<any>(`/api/threads/${threadId}`, {read: true}, commonHttpHeaders(userId))    
  }

}
