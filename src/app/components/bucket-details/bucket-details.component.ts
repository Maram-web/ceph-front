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
    // Si l'API retourne des strings : transformons-les
    this.files = data.map((f: string | any) => typeof f === 'string' ? { name: f } : f);
  });
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
download(file: any) {
  const url = this.getFileUrl(file.name);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
}
getFileType(filename: string): 'image' | 'video' | 'pdf' | 'other' {
  if (!filename) return 'other';

  const parts = filename.toLowerCase().split('.');
  const extension = parts.length > 1 ? parts.pop() : null;

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
        this.loadFiles(); // ✅ Recharge la liste après suppression
      },
      error: (err) => console.error('Erreur suppression fichier', err)
    });
  }
}



}
