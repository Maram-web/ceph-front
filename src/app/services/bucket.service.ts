// src/app/services/bucket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BucketService {
  private apiUrl = '/api/buckets';

  constructor(private http: HttpClient) {}
/*
  createBucket(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { name });
  }*/
createBucket(name: string): Observable<any> {
  return this.http.post('/api/buckets', { name }); // ← appel REST réel ici
}


  getBuckets(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  listFiles(bucket: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${bucket}/files`);
  }

  uploadFile(bucket: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${bucket}/upload`, formData);
  }
}
