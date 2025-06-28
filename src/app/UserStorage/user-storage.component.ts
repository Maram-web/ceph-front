import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-storage',
  templateUrl: './user-storage.component.html',
  styleUrls: ['./user-storage.component.scss']
})
export class UserStorageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'storageUsed', 'price'];
  dataSource: any[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.getUsersStorageInfo().subscribe(data => {
      this.dataSource = data;
    });
  }
}
