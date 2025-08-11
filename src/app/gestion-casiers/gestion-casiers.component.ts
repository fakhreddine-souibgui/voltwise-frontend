import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-casiers',
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-casiers.component.html',
  styleUrl: './gestion-casiers.component.css'
})
export class GestionCasiersComponent {
   lockers = Array.from({ length: 5 }, (_, i) => ({
    locker: i + 1,
    reference: '',
    espacePublic: '',
    secteur: '',
    gouvernorat: '',
    ville: ''
  }));

  page = 1;
  totalPages = 10;

}
