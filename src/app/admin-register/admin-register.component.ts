import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {
   admin = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    poste: '',
    password: '',
    confirmPassword: ''
  };

  selectedImage: File | null = null;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onRegister() {
    if (this.admin.password !== this.admin.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.admin.nom);
    formData.append('prenom', this.admin.prenom);
    formData.append('telephone', this.admin.telephone);
    formData.append('email', this.admin.email);
    formData.append('poste', this.admin.poste);
    formData.append('password', this.admin.password);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

     this.http.post<any>('http://localhost:3000/register', formData)
      .subscribe({
        next: () => this.router.navigate(['/admin-login']),
        error: err => {
        console.error('Erreur backend :', err);
       this.errorMessage = err.error?.message || 'Erreur lors de l’inscription.';
       }
      });
  }

}
