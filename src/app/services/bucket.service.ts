import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BucketService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // ✅ Renvoie : { message: string }
  createBucket(name: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/s3/bucket/create?name=${name}`, 
      {}
    );
  }

  // ✅ Renvoie liste des buckets comme avant
  getBuckets(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/s3/buckets`);
  }

  // ✅ Renvoie la liste des fichiers du bucket
  listFiles(bucket: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/s3/${bucket}/files`);
  }

  // ✅ Renvoie : { message: string }
  uploadFile(bucket: string, file: File): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/s3/${bucket}/upload`, 
      formData
    );
  }

  // ✅ Renvoie : { quota: string }
  getRemainingQuota(bucket: string): Observable<{ quota: string }> {
    return this.http.get<{ quota: string }>(
      `${this.baseUrl}/s3/${bucket}/quota/remaining`
    );
  }
}
