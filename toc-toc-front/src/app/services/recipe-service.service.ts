import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/recipe';

  getRecipesByTitle(title: string): Observable<Recipe[]> {

    let request = this.baseUrl + '/' + title;
    return this.http.get<Recipe[]>(request);
  }

  getRecipesByIngredients(ingredients: string[]): Observable<Recipe[]> {
    let request = this.baseUrl + '/by-ingredients';
    return this.http.post<Recipe[]>(request, ingredients);
  }

  getAllRecipes(): Observable<Recipe[]> {
    let request = this.baseUrl + '/all';
    return this.http.get<Recipe[]>(request);
  }

  getRecipeById(id: string): Observable<Recipe>{
      let request = this.baseUrl + '/get/' + id;
      return this.http.get<Recipe>(request);
  }

  getRandom(){
    return this.http.get<Recipe>(this.baseUrl + '/random');
  }
}
