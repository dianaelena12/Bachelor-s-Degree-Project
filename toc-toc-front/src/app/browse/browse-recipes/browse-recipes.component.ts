import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeServiceService } from 'src/app/services/recipe-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse-recipes',
  templateUrl: './browse-recipes.component.html',
  styleUrls: ['./browse-recipes.component.scss']
})
export class BrowseRecipesComponent implements OnInit, OnDestroy {
  recipeComponentSubscription: Subscription = new Subscription();
  
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeServiceService) { }

  ngOnInit(): void {
    const recipeSubscription = this.recipeService.getAllRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;

      for(let recipe of this.recipes){
        if(recipe.image == '')
          recipe.image = 'https://tastesbetterfromscratch.com/wp-content/uploads/2017/06/Fresh-Fruit-Bowl-2.jpg';
        if(recipe.total_time == -1)
          recipe.total_time = 35
      }
    });
    this.recipeComponentSubscription.add(recipeSubscription);
  }

  ngOnDestroy() : void {
    this.recipeComponentSubscription.unsubscribe();
  }

}
