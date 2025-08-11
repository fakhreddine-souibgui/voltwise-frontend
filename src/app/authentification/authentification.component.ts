import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';




@Component({
  selector: 'app-authentification',
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  mode: 'signin' | 'signup' = 'signin';

  signInForm: FormGroup;
  signUpForm: FormGroup;

  governorates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Sfax', 'Sousse', 'Monastir', 'Mahdia'
    // Tu peux ajouter d'autres gouvernorats ici
  ];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      companyName: ['', Validators.required],
      fullName: ['', Validators.required],
      job: ['', Validators.required],
      governorate: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }
  

  switchMode(mode: 'signin' | 'signup') {
    this.mode = mode;
  }
  errorMessage: string | null = null;


  onSignIn() {
    if (this.signInForm.valid) {
      this.http.post<any>('http://localhost:3000/api/signin', this.signInForm.value).subscribe({
        next: (res) => {
          console.log('Connexion réussie', res);
          localStorage.setItem('token', res.token); // Stocker le token JWT
          // Tu peux rediriger ou afficher un message
          this.router.navigate(['/compte-client']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect.';
          } else {
            this.errorMessage = 'Erreur lors de la connexion.';
          }
        }
      });
    }
  }
  

  onSubmit() {
    if (this.signUpForm.valid) {
      this.http.post<any>('http://localhost:3000/api/signup', this.signUpForm.value).subscribe({
        next: (res) => {
          console.log('Inscription réussie', res);
          this.switchMode('signin'); // Facultatif : aller au login
        },
        error: (err) => {
          console.error('Erreur inscription', err);
        }
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
  
}