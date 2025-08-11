import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatResponse {
  response: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
     private apiUrl = 'http://127.0.0.1:5000/chat'; // adapte si besoin

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { message });
  }

}
