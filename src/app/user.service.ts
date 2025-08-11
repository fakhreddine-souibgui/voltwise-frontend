import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

 private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

 /* getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }*/
 getUsers(): Observable<any[]> {
  const token = localStorage.getItem('token');
  console.log('TOKEN UTILISÉ POUR L\'APPEL :', token);  // <-- AJOUT ICI

  if (!token) {
    console.warn('Token JWT absent !');
  }

  return this.http.get<any[]>('http://localhost:3000/api/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

    }
