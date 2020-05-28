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
    });
    this.recipeComponentSubscription.add(recipeSubscription);
  }

  ngOnDestroy() : void {
    this.recipeComponentSubscription.unsubscribe();
  }

}
