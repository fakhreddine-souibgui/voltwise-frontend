import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-popdemo',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './popdemo.component.html',
  styleUrl: './popdemo.component.css'
})
export class PopdemoComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopdemoComponent>,
    private http: HttpClient

  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
  
      this.http.post('http://localhost:3000/api/reservation', formData).subscribe({
        next: (res) => {
          console.log('Données envoyées avec succès !', res);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Erreur lors de l’envoi des données :', err);
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
