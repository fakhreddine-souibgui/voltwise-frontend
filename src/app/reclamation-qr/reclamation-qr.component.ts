import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclamation-qr',
  imports: [FormsModule,CommonModule],
  templateUrl: './reclamation-qr.component.html',
  styleUrl: './reclamation-qr.component.css'
})
export class ReclamationQrComponent {
  
   gouvernorats = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Sfax', 'Sousse', 'Gabès',
    'Médenine', 'Gafsa', 'Kairouan', 'Bizerte', 'Nabeul', 'Monastir'
  ];

  formData: any = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    type_retour: '',
    lieu: '',
    date_probleme: '',
    heure_probleme: '',
    usage_nano_box: '',
    description: '',
    souhaite_retour: ''
  };

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(this.formData).forEach(key => {
      formDataToSend.append(key, this.formData[key]);
    });

    if (this.selectedFile) {
      formDataToSend.append('photo', this.selectedFile);
    }

    this.http.post('http://localhost:3000/api/reclamations/qr', formDataToSend)
      .subscribe({
        next: () => {
          alert('Réclamation envoyée avec succès');
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de l’envoi');
        }
      });
  }

  isFormValid(): boolean {
    return Object.keys(this.formData).every(key => this.formData[key]?.trim() !== '');
  }

  resetForm() {
    this.formData = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      type_retour: '',
      lieu: '',
      date_probleme: '',
      heure_probleme: '',
      usage_nano_box: '',
      description: '',
      souhaite_retour: ''
    };
    this.selectedFile = null;
  }
}
