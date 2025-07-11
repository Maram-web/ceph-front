import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BucketService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  createBucket(name: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/s3/bucket/create?name=${name}`, 
      {}
    );
  }

  getBuckets(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/s3/buckets`);
  }

  listFiles(bucket: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/s3/${bucket}/files`);
  }

  uploadFile(bucketName: string, file: File): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/s3/${bucketName}/upload`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  getRemainingQuota(bucket: string): Observable<{ quota: string }> {
    return this.http.get<{ quota: string }>(
      `${this.baseUrl}/s3/${bucket}/quota/remaining`
    );
  }

  deleteFile(bucketName: string, filename: string) {
    return this.http.delete(`${this.baseUrl}/s3/${bucketName}/files/${filename}`);
  }
}
