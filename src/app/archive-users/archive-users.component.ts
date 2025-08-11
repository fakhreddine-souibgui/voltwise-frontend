import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archive-users',
  imports: [FormsModule,CommonModule],
  templateUrl: './archive-users.component.html',
  styleUrl: './archive-users.component.css'
})
export class ArchiveUsersComponent {
  page = 1;
  totalPages = 10;

  users = Array(10).fill({
    name: 'Jitu Chauhan',
    email: 'jitu@example.com',
    phone1: '+21620555000',
    phone2: 'xxxxxxx',
    society: 'Today',
    role: 'User'
  });

  editUser(user: any) {
    alert(`Modifier: ${user.name}`);
  }

  deleteUser(user: any) {
    alert(`Supprimer: ${user.name}`);
  }

}
