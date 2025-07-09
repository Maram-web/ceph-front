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
quotaMessage: string = '';

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
  const rawName = this.newBucketName.trim();
  if (!rawName) return;

  this.bucketService.createBucket(rawName).subscribe(() => {
    this.newBucketName = '';
    this.showCreateInput = false;
    this.loadBuckets(); // Rafraîchir liste après création
  });
}




  onBucketChange() {
    if (!this.selectedBucket) return;
    this.bucketService.listFiles(this.selectedBucket).subscribe(files => {
      this.files = files;
    });
this.bucketService.getRemainingQuota(this.selectedBucket!).subscribe(res => {
  this.quotaMessage = res.quota; // ✅ maintenant c’est bien une string
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
