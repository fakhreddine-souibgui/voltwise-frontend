import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-gestion-demandes',
  imports: [CommonModule,FormsModule],
  templateUrl: './gestion-demandes.component.html',
  styleUrl: './gestion-demandes.component.css'
})
export class GestionDemandesComponent {
  demandes: any[] = [];
  currentPage = 1;
  totalPages: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDemandes(this.currentPage);
  }

  fetchDemandes(page: number): void {
    this.http.get<any[]>(`http://localhost:3000/api/demandes?page=${page}`).subscribe(data => {
      this.demandes = data;
      this.totalPages = Array(10).fill(0).map((_, i) => i + 1); // simulation 10 pages
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchDemandes(page);
  }

  deleteDemande(id: number): void {
    if (confirm("Supprimer cette demande ?")) {
      this.http.delete(`http://localhost:3000/api/demandes/${id}`).subscribe(() => {
        this.fetchDemandes(this.currentPage);
      });
    }
  }

  downloadPDF(demande: any): void {
    const blob = new Blob([JSON.stringify(demande)], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}