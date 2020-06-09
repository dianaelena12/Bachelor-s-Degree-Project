import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/history';

  getHistory(email: string) {
    let request = this.baseUrl + '/' + email;
    return this.http.get<string[]>(request);
  }

  getFavourites(email: string){
    let request = this.baseUrl + '/favourite/' + email;
    return this.http.get<string[]>(request);
  }

  putHistory(email: string, recipeId: string){
    let request = this.baseUrl + '/' + email + '/' + recipeId;
    return this.http.put(request, {email, recipeId});
  }

  putFavourite(email: string, recipeId: string){
    let request = this.baseUrl + '/favourite/' + email + '/' + recipeId;
    return this.http.put(request,{email, recipeId});
  }

  isFavourite(email: string, recipeId: string){
    let request = this.baseUrl + '/' + email + '/isFavourite/' + recipeId;
    return this.http.get(request);
  }

  deleteFavourite(email: string, recipeId: string){
    let request = this.baseUrl + '/' + email + '/delete/' + recipeId;
    return this.http.delete(request);
  }
}
