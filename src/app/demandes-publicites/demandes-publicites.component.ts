import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demandes-publicites',
  imports: [CommonModule,FormsModule],
  templateUrl: './demandes-publicites.component.html',
  styleUrl: './demandes-publicites.component.css'
})
export class DemandesPublicitesComponent {
page = 1;
  totalPages = 10;

  reservations = [
    {
      user: 'Brahimbenkhalifa ...',
      dateDebut: '17/02/2023',
      dateFin: '17/02/2025',
      espace: '1',
      status: 'Accepté'
    },
    {
      user: 'Brahimbenkhalifa ...',
      dateDebut: '17/02/2023',
      dateFin: '17/02/2025',
      espace: '3',
      status: 'Terminé'
    }
  ];

  onInfoClick(reservation: any) {
    alert(`Infos: ${reservation.user}`);
  }

  onDeleteClick(reservation: any) {
    alert(`Supprimer: ${reservation.user}`);
  }
}
