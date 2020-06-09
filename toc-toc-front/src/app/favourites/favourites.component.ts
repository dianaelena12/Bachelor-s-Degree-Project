import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe';
import { HistoryService } from '../services/history.service';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  recipes: Recipe[] = [];
  constructor(private historyService: HistoryService, private recipeService: RecipeServiceService) { }

  ngOnInit(): void {
    var email = localStorage.getItem('userEmail');
    var historySubscription = this.historyService.getFavourites(email).subscribe((data: string[]) => {
      data.forEach((value) => {this.getRecipe(value)} );
    });
  }

  getRecipe(id: string): void{
    var recipeSubscription = this.recipeService.getRecipeById(id).subscribe(recipeResult => {
      if(recipeResult.image == '')
      recipeResult.image = 'https://tastesbetterfromscratch.com/wp-content/uploads/2017/06/Fresh-Fruit-Bowl-2.jpg';
        if(recipeResult.total_time == -1)
        recipeResult.total_time = 35
      this.recipes.push(recipeResult);
    });
    this.subscription.add(recipeSubscription);
  }

  isEmpty(){
    if(this.recipes.length < 1){
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
