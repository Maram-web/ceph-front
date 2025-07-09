import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BucketService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  createBucket(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/s3/bucket/create?name=${name}`, {});
  }

  getBuckets(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/s3/buckets`);
  }

  listFiles(bucket: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/s3/${bucket}/files`);
  }

  uploadFile(bucket: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/s3/${bucket}/upload`, formData);
  }

  getRemainingQuota(bucket: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/s3/${bucket}/quota/remaining`, {
      responseType: 'text'
    });
  }
}
