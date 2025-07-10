import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BucketService } from '../../services/bucket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.scss']
})
export class BucketDetailsComponent implements OnInit {
  bucketName: string = '';
  files: any[] = [];

  constructor(private route: ActivatedRoute, private bucketService: BucketService) {}

  ngOnInit(): void {
    this.bucketName = this.route.snapshot.paramMap.get('name')!;
    this.loadFiles();
  }

  loadFiles() {
    this.bucketService.listFiles(this.bucketName).subscribe(data => {
      this.files = data;
    });
  }

  download(file: any) {
    const url = this.getFileUrl(file.name);
    window.open(url, '_blank');
  }

onDrop(event: any) {
  const files = event.dataTransfer?.files || event.target.files;
  if (files.length > 0) {
    Array.from(files).forEach((file: any) => {
      this.bucketService.uploadFile(this.bucketName, file).subscribe({
        next: () => this.loadFiles(), // ✅ recharge avec noms corrects
        error: (err) => console.error('Erreur upload', err)
      });
    });
  }
}


  getFileUrl(filename: string): string {
    return `${environment.apiUrl}/s3/${this.bucketName}/files/${filename}`;
  }

  getFileType(filename: string): 'image' | 'video' | 'pdf' | 'other' {
    const extension = filename?.toLowerCase().split('.').pop();
    if (!extension) return 'other';

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) return 'image';
    if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';
    if (['pdf'].includes(extension)) return 'pdf';
    return 'other';
  }
deleteFileFromBucket(filename: string) {
  if (confirm(`Supprimer le fichier "${filename}" ?`)) {
    this.bucketService.deleteFile(this.bucketName, filename).subscribe({
      next: () => {
        this.files = this.files.filter(file => file.name !== filename); // ✅ Corrigé ici
      },
      error: (err) => console.error('Erreur suppression fichier', err)
    });
  }
}


}
