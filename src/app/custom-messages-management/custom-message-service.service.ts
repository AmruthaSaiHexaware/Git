import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageServiceService {
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private apiUrl='https://42fdb2e1-88ef-4fbe-90c4-2acd7ac14c1a.mock.pstmn.io'
  constructor(private httpclient:HttpClient) { }

  addMessage(newMessage: any) {
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, newMessage]);
  }

  setMessages(messages: any[]) {
    this.messagesSubject.next(messages);
  }

  getCurrentMessages() {
    return this.messagesSubject.getValue();
  }

  getMessages():Observable<any>{
    return this.httpclient.get<any>(this.apiUrl);

  }
  getMessageById(id: any): Observable<any> {
    console.log(id);
    return this.httpclient.get<any>(`${this.apiUrl}/client-api/v1/message?messageId=${id}`);
  }
  getNewMessage():Observable<any> {
    return this.httpclient.get<any>(this.apiUrl+'/client-api/v1/all-messages')
  }
  postMessage(message: any, id: string): Observable<any> { 
    return this.httpclient.post<any>(`${this.apiUrl}/client-api/v1/messages/${id}`, message); 
  } 
  updateMessage(message: any): Observable<any> {
    console.log(message); 
    const url = `${this.apiUrl}/client-api/v1/messages/${message.messageId}`;
    return this.httpclient.put(url, message);
  }
  deleteMessage(message:any):Observable<any> {
    console.log(message);
    
    return this.httpclient.delete<any>(`${this.apiUrl}/client-api/v1/messages/${message}`)
  }
  
 
}

