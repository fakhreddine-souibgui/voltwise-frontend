import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-gestion-reclamations',
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-reclamations.component.html',
  styleUrl: './gestion-reclamations.component.css'
})
export class GestionReclamationsComponent {
   /*reclamations: any[] = [];
  page: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;*/
  /************* */
 /* qrReclamations: any[] = [];
paginatedReclamations: any[] = [];

currentPage: number = 1;
qrItemsPerPage: number = 5;
totalItems: number = 0;
selectedReclamation: any = null;

  showPopup = false;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllReclamations();
      this.getQRReclamations();      // Deuxième table

  }

  getAllReclamations(): void {
    const token = localStorage.getItem('adminToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/api/admin/reclamations', { headers })
      .subscribe({
        next: (data) => {
          this.reclamations = data;
          this.totalPages = Math.ceil(this.reclamations.length / this.itemsPerPage);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des réclamations admin :', error);
        }
      });
  }

  get reclamationsPagines(): any[] {
    const start = (this.page - 1) * this.itemsPerPage;
    return this.reclamations.slice(start, start + this.itemsPerPage);
  }

  changerPage(p: number): void {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
    }
  }


getQRReclamations(): void {
  const token = localStorage.getItem('adminToken');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  this.http.get<any[]>('http://localhost:3000/api/reclamations-qr', { headers })
    .subscribe({
      next: (data) => {
        this.qrReclamations = data;
        this.totalItems = data.length;
        this.totalPages = Math.ceil(this.totalItems / this.qrItemsPerPage);
        this.updatePaginatedReclamations();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réclamations QR :', error);
      }
    });
}

updatePaginatedReclamations(): void {
  const start = (this.currentPage - 1) * this.qrItemsPerPage;
  const end = start + this.qrItemsPerPage;
  this.paginatedReclamations = this.qrReclamations.slice(start, end);
}

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePaginatedReclamations();
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedReclamations();
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedReclamations();
  }
}
openPopup(reclamation: any) {
  this.selectedReclamation = reclamation;
  this.showPopup = true;
}

closePopup() {
  this.selectedReclamation = null;
  this.showPopup = false;
}
*/
 // ======== Tableau 1 (existant) ========
  reclamations: any[] = [];
  page: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  // ======== Tableau 2 : Réclamations QR (nouveaux champs) ========
  qrReclamations: any[] = [];
  paginatedReclamations: any[] = [];
  currentPage: number = 1;
  qrItemsPerPage: number = 5;
  totalItems: number = 0;
  qrTotalPages: number = 1;

  selectedReclamation: any = null;
  showPopup = false;

  API_BASE = 'http://localhost:3000'; // adapte si besoin

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllReclamations();   // premier tableau (existant)
    this.getQRReclamations();    // second tableau (QR)
  }

  // ======== Premier tableau (existant) ========
  getAllReclamations(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any[]>(`${this.API_BASE}/api/admin/reclamations`, { headers })
      .subscribe({
        next: (data) => {
          this.reclamations = data || [];
          this.totalPages = Math.ceil(this.reclamations.length / this.itemsPerPage);
        },
        error: (error) => console.error('Erreur réclamations admin :', error)
      });
  }

  get reclamationsPagines(): any[] {
    const start = (this.page - 1) * this.itemsPerPage;
    return this.reclamations.slice(start, start + this.itemsPerPage);
  }

  changerPage(p: number): void {
    if (p >= 1 && p <= this.totalPages) this.page = p;
  }

  // ======== Second tableau : Réclamations QR ========
  getQRReclamations(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    // Cette route renvoie un ARRAY simple (selon ton backend actuel)
    this.http.get<any[]>(`${this.API_BASE}/api/reclamations-qr`, { headers })
      .subscribe({
        next: (rows) => {
          // On s’assure que les clés existent pour l’affichage
          this.qrReclamations = (rows || []).map(r => ({
            id: r.id,
            nom: r.nom,
            prenom: r.prenom,
            email: r.email,
            telephone: r.telephone,
            type_retour: r.type_retour,
            lieu: r.lieu,
            date_probleme: r.date_probleme || null,
            heure_probleme: r.heure_probleme || null,
            usage_nano_box: r.usage_nano_box,
            description: r.description,
            photo_url: r.photo_url,
            souhaite_retour: r.souhaite_retour,
            date_reclamation: r.date_reclamation
          }));

          this.totalItems = this.qrReclamations.length;
          this.qrTotalPages = Math.max(1, Math.ceil(this.totalItems / this.qrItemsPerPage));
          this.currentPage = Math.min(this.currentPage, this.qrTotalPages);
          this.updatePaginatedReclamations();
        },
        error: (error) => console.error('Erreur réclamations QR :', error)
      });
  }

  updatePaginatedReclamations(): void {
    const start = (this.currentPage - 1) * this.qrItemsPerPage;
    const end = start + this.qrItemsPerPage;
    this.paginatedReclamations = this.qrReclamations.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.qrTotalPages) {
      this.currentPage = page;
      this.updatePaginatedReclamations();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedReclamations();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.qrTotalPages) {
      this.currentPage++;
      this.updatePaginatedReclamations();
    }
  }

  openPopup(reclamation: any) {
    this.selectedReclamation = reclamation;
    this.showPopup = true;
  }

  closePopup() {
    this.selectedReclamation = null;
    this.showPopup = false;
  }

  // construit l’URL absolue pour l’image
  photoFullUrl(rel: string | null): string | null {
    if (!rel) return null;
    if (rel.startsWith('http')) return rel;
    return `${this.API_BASE}${rel}`;
  }
}
