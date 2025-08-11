import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-admin-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
   email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('admin', JSON.stringify(res.admin));  
        localStorage.setItem('adminToken', res.token);
        this.router.navigate(['/adminn']);
      },
      error: () => this.errorMessage = 'Email ou mot de passe incorrect.'
    });
  }

}
