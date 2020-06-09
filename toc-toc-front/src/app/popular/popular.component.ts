import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeViewsService } from '../services/recipe-views.service';
import { Recipe } from '../models/recipe';
import { Subscription } from 'rxjs';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit, OnDestroy {

  constructor(public recipeViewService: RecipeViewsService, public recipeService: RecipeServiceService) { }
  subscriptions: Subscription = new Subscription();

  recipes: Recipe[] = [];

  ngOnInit(): void {

    var popularRecipesSubscription = this.recipeViewService.getPopularRecipes().subscribe((data: string[]) => {
      data.forEach((value) => {this.getRecipe(value)} );
    });

    this.subscriptions.add(popularRecipesSubscription);
  }

  getRecipe(id: string): void{
    var recipeSubscription = this.recipeService.getRecipeById(id).subscribe(recipeResult => {
      if(recipeResult.image == '')
        recipeResult.image = 'https://tastesbetterfromscratch.com/wp-content/uploads/2017/06/Fresh-Fruit-Bowl-2.jpg';
      if(recipeResult.total_time == -1)
        recipeResult.total_time = 35
      this.recipes.push(recipeResult);
    });
    this.subscriptions.add(recipeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
