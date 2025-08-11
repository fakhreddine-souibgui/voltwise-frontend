import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule ,isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-maps',
  imports: [CommonModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements AfterViewInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      // Définir une icône personnalisée
      const customIcon = L.icon({
        iconUrl: 'assets/mes images/iconlocation.png',
        //shadowUrl: 'assets/images/marker-shadow.png', // facultatif
        iconSize: [32, 32], // taille de l'icône
        iconAnchor: [16, 32], // point d'ancrage de l'icône
        popupAnchor: [0, -32] // point où la popup s'ouvre relativement à l'icône
      });

      const map = L.map('map').setView([36.86590595943509, 10.218503262584559], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Utilisation de l’icône personnalisée
      L.marker([36.86590595943509, 10.218503262584559], { icon: customIcon }).addTo(map)
       .bindPopup
       (`
    <div style="text-align:center;">
      <h3 style="margin: 5px 0; color: #1E5F75;">Utopia Soukra - Food Market</h3>
      <img src="assets/mes images/utopia.jpg" alt="Technopôle" style="width:100px; height:auto; border-radius: 8px; margin-bottom: 8px;">
    </div>
  `)
        .openPopup();
    }
  }
}