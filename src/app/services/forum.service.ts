import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http'; // ⬅️ assure-toi d'importer ceci

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

  // ✅ Corrigé : récupération des posts + commentaires
  getAllMessagesAndComments(): Observable<ForumPost[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ForumPost[]>(`${this.apiUrl}/messages`, { headers });
  }

postComment(postFile: string, comment: string): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  const params = new HttpParams()
    .set('postFile', postFile)
    .set('comment', comment);

  return this.http.post(`${this.apiUrl}/comment`, null, {
    headers,
    params,
    responseType: 'text'
  });
}
}
