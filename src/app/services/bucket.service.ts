// src/app/services/bucket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BucketService {
private baseUrl = '/s3';

  constructor(private http: HttpClient) {}
/*
  createBucket(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { name });
  }*/
createBucket(name: string): Observable<any> {
  return this.http.post(`/api/s3/bucket/create?name=${name}`, {});
}

getBuckets(): Observable<string[]> {
  return this.http.get<string[]>(`/api/s3/buckets`);
}


listFiles(bucket: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/${bucket}/files`);
}

uploadFile(bucket: string, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.baseUrl}/${bucket}/upload`, formData);
}



/*
  getBuckets(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }*/

  
}
