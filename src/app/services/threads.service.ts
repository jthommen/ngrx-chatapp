import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AllUserData } from '../../../shared/to/all-user-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SendNewMessageActionPayload } from '../store/actions';
import { commonHttpHeaders } from './commonHttpHeaders';

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

}
