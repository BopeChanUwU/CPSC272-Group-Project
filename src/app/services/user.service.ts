import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) {}

  getUserss(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  addUser(u: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, u);
  }
  updateUser(id: number, u: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, u);
  }
  deleteUser(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.apiUrl}/${id}`);
  }
}