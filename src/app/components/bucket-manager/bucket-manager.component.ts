import { Component, OnInit } from '@angular/core';
import { BucketService } from '../../services/bucket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bucket-manager',
  templateUrl: './bucket-manager.component.html',
  styleUrls: ['./bucket-manager.component.scss']
})
export class BucketManagerComponent implements OnInit {
  buckets: string[] = [];
  selectedBucket: string | null = null;
  newBucketName = '';
  showCreateInput = false; // 👈 new
  files: any[] = [];
  selectedFiles: FileList | null = null;

constructor(
  private bucketService: BucketService,
  private router: Router
) {}


  ngOnInit(): void {
    this.loadBuckets();
    
  }

  toggleCreate() {
    this.showCreateInput = !this.showCreateInput;
  }

  loadBuckets() {
    this.bucketService.getBuckets().subscribe(data => {
      this.buckets = data;
    });
  }

createBucket() {
  if (!this.newBucketName.trim()) return;

  const name = this.newBucketName;
  this.newBucketName = '';
  this.showCreateInput = false;

  console.log('FAKE bucket created:', name);

  // ⚠️ Pas d'appel HTTP, juste navigation directe
  this.router.navigate(['/bucket', name]);
  
}



  onBucketChange() {
    if (!this.selectedBucket) return;
    this.bucketService.listFiles(this.selectedBucket).subscribe(files => {
      this.files = files;
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    if (!this.selectedBucket || !this.selectedFiles) return;

    Array.from(this.selectedFiles).forEach(file => {
      this.bucketService.uploadFile(this.selectedBucket!, file).subscribe(() => {
        this.onBucketChange(); // refresh file list
      });
    });
  }
}
