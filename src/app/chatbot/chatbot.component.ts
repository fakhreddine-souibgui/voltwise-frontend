import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-chatbot',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
 /* userMessage = '';
  responseLines: string[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    const body = { message: this.userMessage };
    this.http.post<any>('http://127.0.0.1:5000/chat', body).subscribe({
      next: (res) => {
        this.responseLines = res.response;
      },
      error: (err) => {
        this.responseLines = ['Erreur lors de la communication avec le chatbot.'];
        console.error(err);
      }
    });
  }*/
  /*isOpen = false;
  userMessage = '';
  chatHistory: { from: 'user' | 'bot'; text: string }[] = [];
  loading = false;

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.chatHistory.push({ from: 'user', text: this.userMessage });
    this.loading = true;
    const messageToSend = this.userMessage;
    this.userMessage = '';

    this.chatbotService.sendMessage(messageToSend).subscribe({
      next: (res) => {
        if (res.response) {
          this.chatHistory.push({ from: 'bot', text: res.response });
        } else if (res.error) {
          this.chatHistory.push({ from: 'bot', text: 'Erreur: ' + res.error });
        }
        this.loading = false;
      },
      error: (err) => {
        this.chatHistory.push({ from: 'bot', text: 'Erreur serveur' });
        this.loading = false;
      }
    });
  }*/
 loading = false;
  showChat = false;
  message = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  response: string | null = null;

  constructor(private http: HttpClient) {}

  toggleChat(): void {
    this.showChat = !this.showChat;
    if (!this.showChat) {
      this.clearForm();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Aperçu image
      const reader = new FileReader();
      reader.onload = e => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  clearForm(): void {
    this.message = '';
    this.removeImage();
    this.response = null;
  }

  /*onSubmit(): void {
    const formData = new FormData();
    formData.append('message', this.message);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post<any>('http://localhost:5000/chat', formData).subscribe({
      next: (res) => {
        this.response = res.response;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.response = 'Erreur lors de l\'envoi.';
      },
    });
  }*/
 onSubmit(): void {
  this.loading = true;
  this.response = null;

  const formData = new FormData();
  formData.append('message', this.message);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.http.post<any>('http://localhost:5000/chat', formData).subscribe({
    next: (res) => {
      this.response = res.response;
      this.loading = false;
    },
    error: (err) => {
      console.error('Erreur:', err);
      this.response = 'Erreur lors de l\'envoi.';
      this.loading = false;
    },
  });
}
  }



