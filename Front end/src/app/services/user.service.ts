import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.user_api_url}/users`;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  
  // Add this method to get a single user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  
  getUserByEmailPassword(email: string, password: string): Observable<User> {
    const url = `${this.apiUrl}/login/auth`;
    return this.http.post<User>(url, { email, password });
  }
  
  addUser(u: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, u);
  }
  
  updateUser(id: number, u: User): Observable<User> {
    console.log('UserService.updateUser called with ID:', id);
    console.log('PUT request to:', `${this.apiUrl}/${id}`);
    return this.http.put<User>(`${this.apiUrl}/${id}`, u);
  }
  
  deleteUser(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.apiUrl}/${id}`);
  }
  
  // -------------------- LOGIN --------------------
  login(email: string, password: string): Observable<User> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<User>(url, { email, password });
  }
}