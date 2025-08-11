import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-espace-public',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './espace-public.component.html',
  styleUrl: './espace-public.component.css'
})
export class EspacePublicComponent {
/*espaces: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEspaces();
  }

  getEspaces(): void {
    const token = localStorage.getItem('adminToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/api/admin/stations', { headers })
      .subscribe({
        next: (data) => {
          this.espaces = data;
          this.totalPages = Math.ceil(this.espaces.length / this.itemsPerPage);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des espaces admin :', error);
        }
      });
  }

  get espacesPagines(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.espaces.slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  ouvrirPopupModification(espace: any) {
    // à compléter
  }

  supprimerEspace(espace: any) {
    // à compléter
  }

  ajouterEspace() {
    // à compléter
  }*/
 espaces: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEspaces();
  }

  getEspaces(): void {
    const token = localStorage.getItem('adminToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/api/admin/espaces', { headers })
      .subscribe({
        next: (data) => {
          this.espaces = data;
          this.totalPages = Math.ceil(this.espaces.length / this.itemsPerPage);
        },
        error: (error) => {
          console.error('Erreur récupération des espaces admin :', error);
        }
      });
  }

  get espacesPagines(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.espaces.slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  ouvrirPopupModification(espace: any) {
    // à compléter
  }

  supprimerEspace(espace: any) {
    // à compléter
  }

  ajouterEspace() {
    // à compléter
  }
}
