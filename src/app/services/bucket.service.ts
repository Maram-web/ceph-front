import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BucketService {
  private baseUrl = '/api'; // ✅ Uniformiser l'URL de base

  constructor(private http: HttpClient) {}

  createBucket(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/bucket/create?name=${name}`, {});
  }

  getBuckets(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/buckets`);
  }

  listFiles(bucket: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${bucket}/files`);
  }

  uploadFile(bucket: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/${bucket}/upload`, formData);
  }

  getRemainingQuota(bucket: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/${bucket}/quota/remaining`, { responseType: 'text' });
  }
}
