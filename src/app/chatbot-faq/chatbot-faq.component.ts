import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-chatbot-faq',
  imports: [CommonModule, FormsModule, NgFor, NgIf, ChatbotFaqComponent],
  templateUrl: './chatbot-faq.component.html',
  styleUrl: './chatbot-faq.component.css'
})
export class ChatbotFaqComponent {
    history: any[] = [];
    isLoading = true;
   faq: any[] = [];
  newQuestion: string = '';
  newAnswer: string = '';
  expandedRow: number | null = null;
  searchTerm: string = '';
filteredHistory: any[] = [];


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFaq();
     this.loadHistory();
    /*this.histor();*/

    
  }
/* histor(){
  this.http.get<any[]>('http://localhost:5000/api/history')
      .subscribe(data => this.history = data);
 }*/
toggleRow(index: number) {
  this.expandedRow = this.expandedRow === index ? null : index;
}
  loadFaq() {
    this.http.get<any[]>('http://localhost:3000/api/faq').subscribe(data => {
      this.faq = data.map(item => ({
        ...item,
        answersText: item.answers.join(' | ')
      }));
    });
  }

  addFaq() {
    const body = {
      question: this.newQuestion,
      answers: this.newAnswer.split('|').map(a => a.trim())
    };
    this.http.post('http://localhost:3000/api/faq/add', body).subscribe(() => {
      this.newQuestion = '';
      this.newAnswer = '';
      this.loadFaq();
    });
  }

  updateFaq(entry: any) {
    const body = {
      id: entry.id,
      question: entry.question,
      answers: entry.answersText.split('|').map((a: string) => a.trim())
    };
    this.http.put(`http://localhost:3000/api/faq/update/${entry.id}`, body).subscribe(() => {
      this.loadFaq();
    });
  }

  deleteFaq(id: number) {
    this.http.delete(`http://localhost:3000/api/faq/delete/${id}`).subscribe(() => {
      this.loadFaq();
    });
  }
 loadHistory() {
  this.isLoading = true;
  this.http.get<any[]>('http://localhost:5000/api/history').subscribe({
    next: (data) => {
      this.history = data;
      this.filteredHistory = data;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Erreur lors du chargement de l’historique', err);
      this.isLoading = false;
    }
  });
}

filterHistory() {
  const term = this.searchTerm.toLowerCase();
  this.filteredHistory = this.history.filter(item =>
    item.message.toLowerCase().includes(term) ||
    item.response.toLowerCase().includes(term)
  );
}

}