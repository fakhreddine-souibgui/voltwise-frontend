import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corbeille',
  imports: [FormsModule,CommonModule],
  templateUrl: './corbeille.component.html',
  styleUrl: './corbeille.component.css'
})
export class CorbeilleComponent {
  // ✅ Données fictives à afficher
  clients = Array.from({ length: 100 }, (_, i) => ({
    fullName: 'Brahim',
    job: 'PDG',
    email: 'Timberl..',
    phone1: '+21655...',
    phone2: 'XXXX',
    gouvernorat: 'Tunis',
    ville: 'Ben ar...',
    typeDemande: 'Client',
    entreprise: 'Timberland',
    message: '16/04/..'
  }));

  // ✅ Paramètres de pagination
  page: number = 1;
  itemsPerPage: number = 10;

  // ✅ Getter pour calculer le total des pages
  get totalPages(): number {
    return Math.ceil(this.clients.length / this.itemsPerPage);
  }

  // ✅ Méthode pour obtenir les clients affichés sur la page actuelle
  get paginatedClients() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.clients.slice(start, end);
  }

  // ✅ Suppression d'un client à l'index donné (dans la page)
  deleteClient(indexInPage: number) {
    const realIndex = (this.page - 1) * this.itemsPerPage + indexInPage;
    this.clients.splice(realIndex, 1);

    // ⚠️ Réajuster la page si on supprime le dernier élément de la dernière page
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }
  }

  // ✅ (Optionnel) méthode explicite pour changer de page
  setPage(n: number) {
    if (n >= 1 && n <= this.totalPages) {
      this.page = n;
    }
  }

}
