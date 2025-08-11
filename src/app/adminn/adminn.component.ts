import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotFaqComponent } from '../chatbot-faq/chatbot-faq.component';
import { Router } from '@angular/router';
import { AdminUsersListComponent } from '../admin-users-list/admin-users-list.component';
import { HttpClient } from '@angular/common/http';
import { EspacePublicComponent } from '../espace-public/espace-public.component';
import { GestionStationComponent } from '../gestion-station/gestion-station.component';
import { GestionCasiersComponent } from '../gestion-casiers/gestion-casiers.component';
import { GestionReclamationsComponent } from '../gestion-reclamations/gestion-reclamations.component';
import { DemandesPublicitesComponent } from '../demandes-publicites/demandes-publicites.component';
import { GestionCommentairesComponent } from '../gestion-commentaires/gestion-commentaires.component';
import { ArchiveUsersComponent } from '../archive-users/archive-users.component';
import { CorbeilleComponent } from '../corbeille/corbeille.component';
import { MapsComponent } from '../maps/maps.component';
import { GestionDemandesComponent } from '../gestion-demandes/gestion-demandes.component';











@Component({
  selector: 'app-adminn',
  imports: [CommonModule, FormsModule, NgFor, NgIf,ChatbotFaqComponent,AdminUsersListComponent,EspacePublicComponent,GestionStationComponent,GestionCasiersComponent,GestionReclamationsComponent,DemandesPublicitesComponent,GestionCommentairesComponent,ArchiveUsersComponent,CorbeilleComponent,MapsComponent,GestionDemandesComponent],
  templateUrl: './adminn.component.html',
  styleUrl: './adminn.component.css'
})
export class AdminnComponent {
  admin: any = {};

  currentSection: string = 'dashboard';
  showProfileMenu = false;
  constructor(private http: HttpClient,private router: Router) {}


  /* ngOnInit(): void {
  if (typeof window !== 'undefined' && localStorage.getItem('admin')) {
    this.admin = JSON.parse(localStorage.getItem('admin')!);
  }
}*/
/*ngOnInit(): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      this.admin = JSON.parse(adminData);
    }
  }
}*/
ngOnInit(): void {
  if (typeof window !== 'undefined' && localStorage.getItem('admin')) {
    this.admin = JSON.parse(localStorage.getItem('admin')!);
  }

}



  setSection(section: string) {
    this.currentSection = section;
  }
  
onImageError(event: any) {
  event.target.src = 'assets/mes images/default-avatar.png';
}
toggleProfileMenu() {
  this.showProfileMenu = !this.showProfileMenu;
}
goToProfile() {
  this.router.navigate(['/admin/profile']); // chemin de la page profil
}
logout() {
  localStorage.removeItem('admin');
  window.location.href = '/admin-login'; // Redirige vers la page de login
}


//Dashboard





//gestion-users************
/*currentPage = 1;
totalPages = 10;

users = Array(10).fill(0).map((_, i) => ({
  fullName: 'Jitu Chauhan',
  email: 'jitu@example.com',
  phone1: '+21620555000',
  phone2: 'xxxxxxx',
  society: 'Today',
  role: 'User'
}));

goToPage(page: number) {
  this.currentPage = page;
}
*/
currentPage = 1;
  totalPages = 1;
  users: any[] = [];

 /* ngOnInit() {
    this.fetchUsers();
  }*/

  

  
/*gestion du demande******************/
currentPagee = 1;
  totalPagess = Array.from({ length: 10 }, (_, i) => i + 1);

  demandes = [
    {
      nom: 'Timberland',
      job: 'Creative Director',
      email: 'timber@example.com',
      phone1: '+21655000000',
      phone2: 'XXXX',
      gouv: 'Tunis',
      ville: 'Ben arous',
      type: 'Client',
      entreprise: 'Timberland',
      date: '16/04/2024',
      message: 'Hello'
    },
    // Répéter ou générer d’autres éléments...
  ];

  changePage(page: number) {
    this.currentPage = page;
  }


}
