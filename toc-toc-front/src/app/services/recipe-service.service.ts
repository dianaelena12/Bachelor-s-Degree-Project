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

  getAllRecipes(): Observable<Recipe[]> {
    let request = this.baseUrl + '/all';
    return this.http.get<Recipe[]>(request);
  }

  getRecipeById(id: string): Observable<Recipe>{
      let request = this.baseUrl + '/get/' + id;
      return this.http.get<Recipe>(request);
  }
}
