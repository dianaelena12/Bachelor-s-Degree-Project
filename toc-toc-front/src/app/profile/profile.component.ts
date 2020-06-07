import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeViewsService } from '../services/recipe-views.service';
import { RecipeServiceService } from '../services/recipe-service.service';
import { HistoryService } from '../services/history.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    recipe: Recipe = new Recipe();
    ingredients = [];
    constructor(public activatedRoute: ActivatedRoute, public recipeViewService: RecipeViewsService, public recipeService: RecipeServiceService, public historyService: HistoryService) { }

    ngOnInit() {
      var ceva = window.history.state;
      var recipeSubscription = this.recipeService.getRecipeById(ceva.recipe).subscribe((recipeResult: Recipe) => {
          this.recipe = recipeResult;
          var viewSubscription = this.recipeViewService.increaseView(this.recipe.id).subscribe();
          this.subscription.add(viewSubscription);
          var email = localStorage.getItem('userEmail');
          if(email != ''){
              var historySubscription = this.historyService.putHistory(email, this.recipe.id).subscribe();
              this.subscription.add(historySubscription);
          }

          if(this.recipe.total_time == -1)
          this.recipe.total_time = 60;
          this.ingredients = this.recipe.ingredients;
          if(this.recipe.image == ''){
              this.recipe.image = 'https://tastesbetterfromscratch.com/wp-content/uploads/2017/06/Fresh-Fruit-Bowl-2.jpg';
          }
      })

      this.subscription.add(recipeSubscription);
      
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
