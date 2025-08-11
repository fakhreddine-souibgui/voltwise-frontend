import { Component,OnInit,Inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';




@Component({
  selector: 'app-compte-client',
  imports: [CommonModule,FormsModule],
  templateUrl: './compte-client.component.html',
  styleUrl: './compte-client.component.css'
})
export class CompteClientComponent implements OnInit{
  activeSection: string = 'profile'; // valeur par défaut
  user: any ;
/*profil***************/
stations: any[] = [];
paginatedStations: any[] = [];
currentPage: number = 1;
itemsPerPage: number = 4; // ajuste selon le nombre de lignes visibles
pages: number[] = [];
totalPages: number = 0;
newStation = {
  reference: '',
  espace: '',
  adresse: '',
  date_installation: ''
};
showPopup = false;

constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) {}

/*ngOnInit() {
  //this.getStations();
  this.fetchUserProfile();

}*/
ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.getUserData();
  }
  this.fetchUserProfile();

}
// Méthode pour récupérer les données utilisateur
getUserData(): void {
  const token = localStorage.getItem('token');
  if (token) {
    this.http.get('http://localhost:3000/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (response: any) => {
        if (response && response.user) {
          this.user = response.user;
          console.log('Utilisateur récupéré :', this.user);
          // Par exemple : this.getStations(); ici
        } else {
          console.error('Réponse invalide ou utilisateur absent');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
        if (error.status === 401 || error.status === 403) {
          // Optionnel : rediriger vers la page de login
          console.warn('Token invalide ou expiré, déconnexion');
          localStorage.removeItem('token');
        }
      }
    });
  } else {
    console.warn('Token non trouvé, utilisateur non connecté');
    // Optionnel : rediriger vers /login
  }
}






getStations(): void {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.get<any[]>('http://localhost:3000/api/stations', { headers }).subscribe({
    next: (data) => {
      this.stations = data;
      console.log('Stations récupérées :', this.stations);
      this.setupPagination();

    },
    error: (err) => {
      console.error('Erreur stations :', err);
    }
  });
}




addStation() {
  if (!this.newStation.reference || !this.newStation.espace || !this.newStation.adresse || !this.newStation.date_installation) {
    alert("Tous les champs sont requis");
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert("Utilisateur non authentifié.");
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  const stationToSend = {
    ...this.newStation,
    user_id: this.user.id
  };

  this.http.post('http://localhost:3000/api/stations', stationToSend, { headers, responseType: 'text' }).subscribe(
    () => {
      
      this.newStation = { reference: '', espace: '', adresse: '', date_installation: '' };
      this.getStations();
      this.closePopup(); // Facultatif : ferme le popup après ajout
    },
    error => {
      console.error('Erreur lors de l\'ajout de la station :', error);
      alert("Erreur lors de l'ajout de la station.");
    }
  );
}

openPopup() {
  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
}
  
setupPagination() {
  this.totalPages = Math.ceil(this.stations.length / this.itemsPerPage);
  this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  this.updatePaginatedStations();
}

updatePaginatedStations() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  this.paginatedStations = this.stations.slice(start, end);
}

goToPage(page: number, event: Event) {
  event.preventDefault();
  this.currentPage = page;
  this.updatePaginatedStations();
}

previousPage(event: Event) {
  event.preventDefault();
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedStations();
  }
}

nextPage(event: Event) {
  event.preventDefault();
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedStations();
  }
}


fetchUserProfile() {
  if (typeof window === 'undefined') return; // s'assurer que c’est exécuté dans le navigateur

  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('Token manquant.');
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  this.http.get<{ message: string; user: any }>('http://localhost:3000/api/me', { headers })
    .subscribe({
      next: ({ user }) => {
        if (user) {
          console.log('Utilisateur connecté :', user);
          this.user = user;
          this.getStations(); // 👈 Appeler getStations ici après avoir récupéré l'utilisateur
          this.loadReclamations();
          this.loadEspaces();


        } else {
          console.warn('Aucun utilisateur trouvé.');
        }
      },
      error: err => {
        console.error('Erreur récupération user', err);
        // Ajouter des actions pour gérer l'échec de la récupération des informations
      }
    });
}

/*stations = [
    { ref: 'Ref102.203', status: 'Succeeded', date: '12/05/2024', amount: '80 DT', card: 'visa', cardNumber: '4242' },
    { ref: 'Ref102.203', status: 'Pending', date: '12/05/2024', amount: '80 DT', card: 'mastercard', cardNumber: '2332' },
    { ref: 'Ref102.203', status: 'Plan Ended', date: '12/05/2024', amount: '80 DT', card: 'mastercard', cardNumber: '2332' },
  ];*/
  /*dashboard*/
  barData = [
    { label: 'Jan', height: 300, class: '' },
    { label: 'Feb', height: 400, class: '' },
    { label: 'Mar', height: 400, class: '' },
    { label: 'Apr', height: 100, class: '' },
    { label: 'May', height: 500, class: '' },
    { label: 'Jun', height: 100, class: '' },
    { label: 'Jul', height: 200, class: '' },
    { label: 'Aug', height: 400, class: 'highlight' },
    { label: 'Sep', height: 400, class: '' },
    { label: 'Oct', height: 100, class: 'lowlight' },
    { label: 'Nov', height: 200, class: '' },
    { label: 'Dec', height: 500, class: '' },
  ];
  /*reclamation*/
  /*reclamations = [
    { date: '06/09/2024', categorie: 'Maintenance', description: 'Lorem Ipsum karadeniz....', status: 'Answered' },
    { date: '06/09/2024', categorie: 'Maintenance', description: 'Lorem Ipsum karadeniz....', status: 'Answered' },
    { date: '06/09/2024', categorie: 'Maintenance', description: 'Lorem Ipsum karadeniz....', status: 'Pending' },
    { date: '06/09/2024', categorie: 'Maintenance', description: 'Lorem Ipsum karadeniz....', status: 'Pending' },
    { date: '06/09/2024', categorie: 'Maintenance', description: 'Lorem Ipsum karadeniz....', status: 'Problem' },
    { date: '06/09/2024', categorie: 'Maintenance', description: 'Lorem Ipsum karadeniz....', status: 'Pending' },
  ];*/
  showReclamationPopup = false;

newReclamation = {
  categorie: '',
  description: '',
};

reclamations: any[] = []; // ou récupérées depuis le backend

openReclamationPopup() {
  this.showReclamationPopup = true;
}

closeReclamationPopup() {
  this.showReclamationPopup = false;
  this.newReclamation = { categorie: '', description: '' };
}

addReclamation() {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const reclamationData = {
    categorie: this.newReclamation.categorie,
    description: this.newReclamation.description
  };

  this.http.post<any>('http://localhost:3000/api/reclamations', reclamationData, { headers })
    .subscribe({
      next: (response) => {
        const newRec = {
          date: new Date().toISOString().split('T')[0],
          categorie: this.newReclamation.categorie,
          description: this.newReclamation.description,
          status: 'Problem',
        };
        this.reclamations.unshift(newRec); // ajout dans le tableau local
        this.closeReclamationPopup();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la réclamation :', err);
      }
    });
}

loadReclamations() {
  if (typeof window !== 'undefined' && localStorage) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:3000/api/reclamations', { headers })
      .subscribe({
        next: (data) => {
          this.reclamations = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des réclamations :', err);
        }
      });
  } else {
    console.warn('localStorage non disponible (probablement côté serveur)');
  }
}
//pagination
currentReclamationPage = 1;
itemsPerReclamationPage = 4;

get paginatedReclamations() {
  const startIndex = (this.currentReclamationPage - 1) * this.itemsPerReclamationPage;
  return this.reclamations.slice(startIndex, startIndex + this.itemsPerReclamationPage);
}

get totalReclamationPages() {
  return Math.ceil(this.reclamations.length / this.itemsPerReclamationPage);
}

changeReclamationPage(page: number) {
  if (page >= 1 && page <= this.totalReclamationPages) {
    this.currentReclamationPage = page;
  }
}





  /*custumarreview*/
  questionnaires = [
    { entreprise: 'Carrefour', type: 'Yes/No question', status: 'En Cours', questions: 2, answers: 130 },
    { entreprise: 'SICAM', type: 'QCM', status: 'Terminé', questions: 2, answers: 130 },
    { entreprise: 'Carrefour', type: 'Yes/No question', status: 'En Cours', questions: 2, answers: 130 },
    { entreprise: 'Carrefour', type: 'Yes/No question', status: 'Terminé', questions: 2, answers: 130 },
  ];

  getStatusClass(status: string): string {
    switch(status) {
      case 'En Cours': return 'badge badge-warning';
      case 'Terminé': return 'badge badge-success';
      default: return 'badge badge-secondary';
    }
  }


  /*spaces */

  espaces: any[] = [];
  currentEspacePage: number = 1;
  itemsPerPageEspace: number = 5;
  showAddSpaceModal = false;
newEspace = {
  nom: '',
  ville: '',
  gouvernorat: '',
  activite: '',
  stations: 0
};

loadEspaces() {
  if (typeof window !== 'undefined' && localStorage) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:3000/api/espaces', { headers })
      .subscribe({
        next: (data) => {
          this.espaces = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des espaces :', err);
        }
      });
  } else {
    console.warn('localStorage non disponible (probablement côté serveur)');
  }
}

openAddSpaceModal() {
  this.showAddSpaceModal = true;
}

closeAddSpaceModal() {
  this.showAddSpaceModal = false;
}

addSpace() {
  if (this.newEspace.nom && this.newEspace.ville && this.newEspace.gouvernorat && this.newEspace.activite && this.newEspace.stations) {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.post('http://localhost:3000/api/espaces', this.newEspace, { headers })
        .subscribe({
          next: (response) => {
            console.log('Espace ajouté avec succès');
            this.loadEspaces();  // Reload espaces after adding
            this.closeAddSpaceModal();  // Close modal
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout de l\'espace :', err);
          }
        });
    }
  }
}

get totalEspacePages(): number {
  return Math.ceil(this.espaces.length / this.itemsPerPageEspace);
}

get pagedEspaces() {
  const start = (this.currentEspacePage - 1) * this.itemsPerPageEspace;
  return this.espaces.slice(start, start + this.itemsPerPageEspace);
}

changeEspacePage(page: number) {
  if (page >= 1 && page <= this.totalEspacePages) {
    this.currentEspacePage = page;
  }
}


}
