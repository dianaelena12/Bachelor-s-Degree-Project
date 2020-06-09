import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeViewsService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/views';

  increaseView(recipeId: string){
    return this.http.get(this.baseUrl + '/post/' + recipeId);
  }

  getPopularRecipes(){
    return this.http.get<string[]>(this.baseUrl + '/top');
  }
}
