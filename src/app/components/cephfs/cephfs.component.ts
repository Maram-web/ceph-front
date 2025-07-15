import { Component, OnInit } from '@angular/core';
import { CephfsService } from '../../services/cephfs.service';

@Component({
  selector: 'app-cephfs',
  templateUrl: './cephfs.component.html',
  styleUrls: ['./cephfs.component.scss']
})
export class CephfsComponent implements OnInit {
  newFolder: string = '';
  newFileName: string = '';
  fileContent: string = '';
  selectedFileContent: string = '';
  files: string[] = [];
  output: string[] = [];

  constructor(private cephfsService: CephfsService) {}

  ngOnInit(): void {
    this.refreshFiles();
      console.log("📂 CephfsComponent chargé !");

  }

  createFolder(): void {
    if (!this.newFolder.trim()) return;

    this.output.push(`📁 Création du dossier : ${this.newFolder}`);
    this.cephfsService.createFolder(this.newFolder).subscribe({
      next: (res) => {
        this.output.push(`✅ Dossier créé : ${res}`);
        this.newFolder = '';
        this.refreshFiles();
      },
      error: (err) => {
        this.output.push(`❌ Erreur création dossier : ${err.error}`);
      }
    });
  }

  createFile(): void {
    if (!this.newFileName.trim() || !this.fileContent.trim()) return;

    this.output.push(`📄 Création du fichier : ${this.newFileName}`);
    this.cephfsService.createFile(this.newFileName, this.fileContent).subscribe({
      next: (res) => {
        this.output.push(`✅ Fichier créé : ${res}`);
        this.newFileName = '';
        this.fileContent = '';
        this.refreshFiles();
      },
      error: (err) => {
        this.output.push(`❌ Erreur création fichier : ${err.error}`);
      }
    });
  }

  readFile(fileName: string): void {
    this.output.push(`📖 Lecture du fichier : ${fileName}`);
    this.cephfsService.readFile(fileName).subscribe({
      next: (res) => {
        this.selectedFileContent = res;
        this.output.push(`📄 Contenu lu avec succès`);
      },
      error: (err) => {
        this.output.push(`❌ Erreur lecture fichier : ${err.error}`);
      }
    });
  }

  refreshFiles(): void {
    this.cephfsService.listFiles().subscribe({
      next: (res) => {
        this.files = res;
      },
      error: (err) => {
        this.output.push('❌ Erreur lors du chargement des fichiers.');
      }
    });
  }
}
