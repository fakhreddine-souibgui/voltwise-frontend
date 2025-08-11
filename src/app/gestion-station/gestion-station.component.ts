import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-station',
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-station.component.html',
  styleUrl: './gestion-station.component.css'
})
export class GestionStationComponent {
   stations: any[] = [];
  page: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/api/admin/stations', { headers })
      .subscribe({
        next: (data) => {
          this.stations = data;
          this.totalPages = Math.ceil(this.stations.length / this.itemsPerPage);
        },
        error: (error) => {
          console.error('Erreur récupération des stations admin :', error);
        }
      });
  }

  get stationsPaginees(): any[] {
    const start = (this.page - 1) * this.itemsPerPage;
    return this.stations.slice(start, start + this.itemsPerPage);
  }

}
