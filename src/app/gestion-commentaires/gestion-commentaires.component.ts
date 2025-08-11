import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-commentaires',
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-commentaires.component.html',
  styleUrl: './gestion-commentaires.component.css'
})
export class GestionCommentairesComponent {

    formData = {
    nomPrenom: 'Ali Ali',
    email: 'ibrahimbenkhalifa@gmail.com',
    tel1: '+21675256462',
    tel2: 'XXXXXXXXXX',
    espace: 'Carrefour',
    typeEspace: 'MALL',
    gouvernorat: 'Ben Arous',
    ville: 'Ben Arous',
    dateDebut: '2024-05-17',
    dateFin: '2025-08-30',
    statut: 'Accepté'
  };
  
   selectedStatus = 'Accepté';
  statuses = ['Accepté', 'En attente', 'Rejeté'];

  modifierPublicite() {
    alert(`Publicité modifiée avec le statut : ${this.selectedStatus}`);
  }

}
