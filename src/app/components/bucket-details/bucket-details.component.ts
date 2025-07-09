import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BucketService } from '../../services/bucket.service';

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
   this.files = [
    {
      name: 'TP1-linux.pdf',
      size: 124532,
      lastModified: new Date('2025-07-08T16:10:00')
    },
    {
      name: 'Kubernetes-guide.md',
      size: 78520,
      lastModified: new Date('2025-07-07T12:05:00')
    }
  ];
}

  loadFiles() {
    this.bucketService.listFiles(this.bucketName).subscribe(data => {
      this.files = data;
    });
  }

  download(file: any) {
    const url = `/api/buckets/${this.bucketName}/files/${file.name}`;
    window.open(url, '_blank');
  }

  onDrop(event: any) {
    const files = event.dataTransfer?.files || event.target.files;
    if (files.length > 0) {
      Array.from(files).forEach((file: any) => {
        this.bucketService.uploadFile(this.bucketName, file).subscribe(() => this.loadFiles());
      });
    }
  }
}
