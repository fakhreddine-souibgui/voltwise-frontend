import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FilterPhonePipe } from '../pipes/filter-phone.pipe';

interface DemandeDevis {
  id: number;
  nom: string;
  email: string;
  nomentreprise: string;
  fonction: string;
  tel: string;
  gouvernorat: string;
  message: string;
  statut: string;
}

@Component({
  selector: 'app-admin',
  imports: [MatTableModule, MatSelectModule, MatButtonModule,CommonModule,FormsModule,FilterPhonePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  /*demandes: DemandeDevis[] = [];*/
  demandes: any[] = [];
  reservations: any[] = [];
  currentPage = 1;
  totalUsers = 0;
  selectedDemande: DemandeDevis | null = null;
  displayedColumns: string[] = ['id', 'nom', 'email', 'nomentreprise', 'fonction', 'tel', 'gouvernorat', 'message', 'statut', 'actions'];

  constructor(private http: HttpClient) {}
  
  searchTel: string = '';

  ngOnInit(): void {
    this.getDemandes();
    this.getReservations();
  }
    getDemandes() {
      this.http.get<any[]>(`http://localhost:3000/api/demandes?page=${this.currentPage}`)
        .subscribe(data => {
          this.demandes = data;
        });
    }
  
    // Aller à la page suivante
nextPage() {
  this.currentPage++;
  this.getDemandes();
}

// Aller à la page précédente
prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.getDemandes();
  }
}

  updateStatut(id: number, statut: string): void {
    this.http.patch(`http://localhost:3000/api/demandes/${id}`, { statut }).subscribe(
      () => this.getDemandes(),
      error => console.error('Erreur lors de la mise à jour du statut', error)
    );
  }

 /* deleteDemande(id: number): void {
    this.http.delete(`http://localhost:3000/api/demandes/${id}`).subscribe(
      () => this.getDemandes(),
      error => console.error('Erreur lors de la suppression', error)
    );
  }*/
    deleteDemande(id: number): void {
      if (confirm("Voulez-vous vraiment supprimer cette demande ?")) {
        this.http.delete(`http://localhost:3000/api/demandes/${id}`).subscribe(
          () => {
            console.log(`Demande ${id} supprimée avec succès.`);
            this.getDemandes();  // Rafraîchir la liste après suppression
          },
          error => console.error('Erreur lors de la suppression', error)
        );
      }
    }

editDemande(demande: DemandeDevis): void {
  this.selectedDemande = { ...demande }; // Copie de l'objet pour éviter toute mutation accidentelle
}

saveChanges(): void {
  if (!this.selectedDemande || !this.selectedDemande.id) {
    console.error("Erreur : ID de la demande invalide", this.selectedDemande);
    return;
  }

  console.log("Mise à jour de la demande avec ID :", this.selectedDemande.id);
  console.log("Données envoyées :", this.selectedDemande);

  this.http.put(`http://localhost:3000/api/demandes/${this.selectedDemande.id}`, this.selectedDemande).subscribe({
    next: () => {
      console.log('Modification réussie');
      this.getDemandes(); // Rafraîchir la liste des demandes
      this.selectedDemande = null; // Réinitialiser la demande sélectionnée après mise à jour
    },
    error: (err) => console.error('Erreur lors de la mise à jour', err)
  });
}


getReservations(): void {
  this.http.get<any[]>('http://localhost:3000/api/reservations').subscribe(data => {
    this.reservations = data;
  });
}

}