import { Component, Input, OnInit,PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule,isPlatformBrowser  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-admin-users-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-users-list.component.html',
  styleUrl: './admin-users-list.component.css'
})
export class AdminUsersListComponent {
   users: any[] = [];
  paginatedUsers: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  selectedUser: any = null;
showEditPopup: boolean = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.warn('Token JWT non trouvé.');
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>('http://localhost:3000/api/users', { headers }).subscribe({
        next: (data) => {
          this.users = data;
          this.setupPagination();
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des utilisateurs :', err);
        }
      });
    }
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    }
  }
  deleteUser(userId: number): void {
  const token = localStorage.getItem('adminToken');
  if (!token) return;

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    this.http.delete(`http://localhost:3000/api/users/${userId}`, { headers }).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== userId);
        this.setupPagination(); // Recalcul pagination
      },
      error: err => console.error('Erreur suppression :', err)
    });
  }
}

/*editUser(user: any): void {
  const newFullName = prompt('Modifier nom complet :', user.fullName);
  if (!newFullName) return;

  const token = localStorage.getItem('adminToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const updatedUser = {
    ...user,
    fullName: newFullName // tu peux aussi demander d’autres champs
  };

  this.http.put(`http://localhost:3000/api/users/${user.id}`, updatedUser, { headers }).subscribe({
    next: () => {
      Object.assign(user, updatedUser);
    },
    error: err => console.error('Erreur modification :', err)
  });
}*/

openEditPopup(user: any): void {
  this.selectedUser = { ...user }; // on clone pour ne pas modifier directement
  this.showEditPopup = true;
}

closeEditPopup(): void {
  this.showEditPopup = false;
  this.selectedUser = null;
}

saveUserChanges(): void {
  const token = localStorage.getItem('adminToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.put(`http://localhost:3000/api/users/${this.selectedUser.id}`, this.selectedUser, { headers })
    .subscribe({
      next: () => {
        // Mettre à jour dans la liste
        const index = this.users.findIndex(u => u.id === this.selectedUser.id);
        if (index !== -1) {
          this.users[index] = this.selectedUser;
          this.updatePaginatedUsers();
        }
        this.closeEditPopup();
      },
      error: err => {
        console.error('Erreur lors de la mise à jour :', err);
      }
    });
}


}
