import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CephfsService {

  private baseUrl = 'http://localhost:8083/api/cephfs';

  constructor(private http: HttpClient) {}

  createFolder(folderName: string): Observable<any> {
    const params = new HttpParams().set('folderName', folderName);
    return this.http.post(`${this.baseUrl}/create-folder`, {}, { params, responseType: 'text' });
  }

  createFile(fileName: string, content: string): Observable<any> {
    const params = new HttpParams().set('fileName', fileName);
    return this.http.post(`${this.baseUrl}/create-file`, content, { params, responseType: 'text' });
  }

  readFile(fileName: string): Observable<string> {
    const params = new HttpParams().set('fileName', fileName);
    return this.http.get(`${this.baseUrl}/read-file`, { params, responseType: 'text' });
  }

  listFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/list`);
  }
}
