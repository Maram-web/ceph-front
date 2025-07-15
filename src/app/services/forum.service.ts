import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface ForumPost {
  post: string;
  filename: string;
  comments: string[];
  date: string;
  newComment?: string; // optionnel pour le binding côté HTML
}


@Injectable({ providedIn: 'root' })
export class ForumService {
  private apiUrl = `${environment.apiUrl}/forum`;

  constructor(private http: HttpClient) {}

  // 📨 Publier un message
  postMessage(message: string): Observable<string> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/post`, { message }, {
      headers,
      responseType: 'text'
    });
  }

  // 📬 Récupérer tous les messages
  getAllMessages(): Observable<string[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<string[]>(`${this.apiUrl}/messages`, { headers });
  }



getAllMessagesAndComments(): Observable<ForumPost[]> {
  return this.http.get<ForumPost[]>(`${this.apiUrl}/messages`);
}
postComment(postFile: string, comment: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/comment`, { postFile, comment });
}



}
