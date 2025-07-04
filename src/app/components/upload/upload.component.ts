import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedType: string = '';

  // 🎴 Cartes pour les types de fichiers
  cards = [
    {
      image: 'assets/images/media.jpeg',
      btn: 'primary',
      type: 'image',
      label: 'Upload Images/Videos',
      description: 'Images médicales, vidéos de formation, scans...'
    },
    {
      image: 'assets/images/vms.png',
      btn: 'accent',
      type: 'db',
      label: 'Upload DBs/VMs',
      description: 'Bases de données, machines virtuelles, dumps...'
    },
    {
      image: 'assets/images/share.jpeg',
      btn: 'warn',
      type: 'fs',
      label: 'Upload Shared Files',
      description: 'Documents partagés, rapports, fichiers PDF...'
    }
  ];

  constructor(private http: HttpClient) {}

  triggerUpload(fileInput: HTMLInputElement, type: string) {
    this.selectedType = type;
    fileInput.click(); // ouvre le sélecteur de fichier
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', this.selectedType); // optionnel, à usage interne

    const token = localStorage.getItem('token') || '';
    console.log('🛡️ Token envoyé :', token);

let headers = new HttpHeaders();
if (token) {
  headers = headers.set('Authorization', `Bearer ${token}`);
}


this.http.post(`${environment.apiUrl}/storage/s3/upload`, formData, {
      headers,
      reportProgress: true,
      observe: 'events',
        
      withCredentials: true // ← AJOUTE CECI

    }).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.Response) {
          alert('✅ Fichier uploadé avec succès !');
          console.log(event.body);
        }
      },
      error: (err: any) => {
        alert('❌ Erreur lors de l’upload');
        console.error(err);
      }
    });
  }
}
