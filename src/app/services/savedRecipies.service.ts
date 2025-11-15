import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { savedRecipies } from '../models/savedRecipies.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class SavedRecipiesService {
  private apiUrl = `${environment.saved_recipe_api_url}/saved`;

  constructor(private http: HttpClient) {}

  // Save a recipe - now with correct parameter order matching your model
  saveRecipe(recipe_id: number, user_id: number): Observable<savedRecipies> {
    console.log('Saving recipe:', { recipe_id, user_id });
    return this.http.post<savedRecipies>(this.apiUrl, { recipe_id, user_id });
  }

  // Unsave a recipe
  unsaveRecipe(user_id: number, recipe_id: number): Observable<any> {
    console.log('Unsaving recipe:', { recipe_id, user_id });
    return this.http.delete(this.apiUrl, { body: { recipe_id, user_id } });
  }

  // Get all saved recipes
  getAllSaved(): Observable<savedRecipies[]> {
    return this.http.get<savedRecipies[]>(this.apiUrl);
  }

  // Get saved recipes by user
  getSavedByUser(user_id: number): Observable<savedRecipies[]> {
    return this.http.get<savedRecipies[]>(`${this.apiUrl}/user/${user_id}`);
  }

  // Get saved users for a recipe
  getSavedByRecipe(recipe_id: number): Observable<savedRecipies[]> {
    return this.http.get<savedRecipies[]>(`${this.apiUrl}/recipe/${recipe_id}`);
  }
}