import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  admin: any;
  editMode = false;
  constructor(private http: HttpClient ) {}

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      this.admin = JSON.parse(storedAdmin);
    } else {
      this.admin = {}; // sécurité
    }
  }
}


selectedImage: File | null = null;

onImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedImage = file;
  }
}

/*saveChanges() {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    alert("Token manquant. Veuillez vous reconnecter.");
    return;
  }

  const formData = new FormData();
  formData.append('nom', this.admin.nom);
  formData.append('prenom', this.admin.prenom);
  formData.append('email', this.admin.email);
  formData.append('telephone', this.admin.telephone);
  formData.append('poste', this.admin.poste);

  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  }

  const headers = {
    'Authorization': `Bearer ${token}`
    // Ne mets pas Content-Type ici, Angular le gère automatiquement pour FormData
  };

  this.http.put('http://localhost:3000/api/admin/' + this.admin.id, formData, { headers })
    .subscribe({
      next: () => {
        this.editMode = false;
        alert('Profil mis à jour avec succès');
        window.location.reload(); // Pour recharger l’image
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la mise à jour');
      }
    });
}*/
saveChanges() {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    alert("Token manquant. Veuillez vous reconnecter.");
    return;
  }

  const formData = new FormData();
  formData.append('nom', this.admin.nom);
  formData.append('prenom', this.admin.prenom);
  formData.append('email', this.admin.email);
  formData.append('telephone', this.admin.telephone);
  formData.append('poste', this.admin.poste);

  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  }

  const headers = {
    'Authorization': `Bearer ${token}`
  };

  this.http.put('http://localhost:3000/api/admin/' + this.admin.id, formData, { headers })
    .subscribe({
      next: (response: any) => {
        this.editMode = false;
        alert('Profil mis à jour avec succès');

        // Supposons que la réponse backend te renvoie le nom du fichier image mis à jour :
        if (response.updatedImageName) {
          this.admin.image = response.updatedImageName;
          /*this.admin.image = this.admin.image + '?' + new Date().getTime();*/

          // Mets à jour localStorage aussi si tu utilises l'admin depuis là
          localStorage.setItem('admin', JSON.stringify(this.admin));
        }

        // Sinon, si pas de réponse image, tu peux aussi forcer un reload de l'image avec un timestamp pour "cacher le cache":
        // this.admin.image = this.admin.image + '?' + new Date().getTime();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la mise à jour');
      }
    });
}



}
