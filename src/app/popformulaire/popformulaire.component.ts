import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';  // Import du module HTTP

@Component({
  selector: 'app-popformulaire',
  imports: [MatDialogModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './popformulaire.component.html',
  styleUrl: './popformulaire.component.css'
})
export class PopformulaireComponent {
  myForm = new FormGroup({
    nom: new FormControl(''),
    nomentreprise: new FormControl(''),
    fonction: new FormControl(''),
    tel: new FormControl(''),
    Gouvernorat: new FormControl(''),
    message: new FormControl(''),
   email: new FormControl('')
  });

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://51.38.235.56:3000/api/formulaire', this.myForm.value)
      .subscribe(response => {
        console.log("Réponse du serveur :", response);
      }, error => {
        console.error("Erreur :", error);
      });
  }
}