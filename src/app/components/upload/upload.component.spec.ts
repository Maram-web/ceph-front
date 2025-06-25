import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  cards = [
    {
      image: 'assets/images/media.jpeg',
      btn: 'accent',
      type: 'media',
      title: 'Télécharger Images & Vidéos',
      description: 'Stockez vos photos, vidéos et documents multimédia.'
    },
    {
      image: 'assets/images/vms.png',
      btn: 'primary',
      type: 'vms',
      title: 'Télécharger DBs & VMs',
      description: 'Sauvegardez vos bases de données et machines virtuelles.'
    },
    {
      image: 'assets/images/share.jpeg',
      btn: 'warn',
      type: 'fs',
      title: 'Télécharger Fichiers Partagés',
      description: 'Gérez vos documents partagés (PDF, Excel, etc.).'
    }
  ];

  selectType(type: string): void {
    console.log(`Type sélectionné : ${type}`);
  }
}
