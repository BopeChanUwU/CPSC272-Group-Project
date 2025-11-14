import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private edit_recipe_id: number = 0;
  private apiUrl = `${environment.recipe_api_url}/recipes`;
  constructor(private http: HttpClient) {}

  getEditRecipeId(): number {
    return this.edit_recipe_id;
  }

  setEditRecipeId(id: number): void {
    this.edit_recipe_id = id;
  }
  
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }
  addRecipe(r: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, r);
  }
  updateRecipe(id: number, r: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, r);
  }
  deleteRecipe(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.apiUrl}/${id}`);
  }
  getRecipesByAuthor(author_id: number): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.apiUrl}/author/${author_id}`);
  }
  getRecipesExceptAuthor(author_id: number): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.apiUrl}/exclude/${author_id}`);
  }

}