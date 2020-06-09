import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeViewsService } from '../services/recipe-views.service';
import { RecipeServiceService } from '../services/recipe-service.service';
import { HistoryService } from '../services/history.service';
import { Subscription } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth-service.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    recipe: Recipe = new Recipe();
    ingredients = [];
    constructor(public activatedRoute: ActivatedRoute, public recipeViewService: RecipeViewsService, public recipeService: RecipeServiceService, public historyService: HistoryService, private alertify: AlertifyService, private authService: AuthService) { }

    ngOnInit() {
      var ceva = window.history.state;
      var recipeId;
      if(ceva.recipe){
            recipeId = ceva.recipe;
      } else {
            recipeId = localStorage.getItem('lastRecipe');
      }
      var recipeSubscription = this.recipeService.getRecipeById(recipeId).subscribe((recipeResult: Recipe) => {
          this.recipe = recipeResult;
          localStorage.setItem('lastRecipe', this.recipe.id);
          var viewSubscription = this.recipeViewService.increaseView(this.recipe.id).subscribe();
          this.subscription.add(viewSubscription);
          var email = localStorage.getItem('userEmail');
          if(email != ''){
              var someSubscription = this.historyService.getHistory(email).subscribe((ids: string[]) => {
                    var last = ids.pop();
                    if(last != this.recipe.id){
                        var historySubscription = this.historyService.putHistory(email, this.recipe.id).subscribe();
                        this.subscription.add(historySubscription);
                    }     
              });
              this.subscription.add(someSubscription);
              var isFavouriteSubscription = this.historyService.isFavourite(email, this.recipe.id).subscribe((response: boolean)=> {
                  if(response == true){
                    document.getElementById("add-favourite").style.visibility = "hidden";
                    document.getElementById("is-favourite").style.visibility = "visible";
                  } else {
                    document.getElementById("add-favourite").style.visibility = "visible";
                    document.getElementById("is-favourite").style.visibility = "hidden";
                  }
              });
              this.subscription.add(isFavouriteSubscription);
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

    addToFavourites(){
        var email = localStorage.getItem('userEmail');
        var recipeId = this.recipe.id;
        var favouriteSubscription = this.historyService.putFavourite(email, recipeId).subscribe(
            () =>{
                this.alertify.success('Added');
                document.getElementById("add-favourite").style.visibility = "hidden";
                document.getElementById("is-favourite").style.visibility = "visible";
        },
            error => {
            this.alertify.error('Something went wrong');
        });
        this.subscription.add(favouriteSubscription);
    }

    removeFromFavourites(){
        var email = localStorage.getItem('userEmail');
        var recipeId = this.recipe.id;
        var removeSubscription = this.historyService.deleteFavourite(email, recipeId).subscribe((response: boolean) => {
            if(response == true){
                this.alertify.success('Removed');
                document.getElementById("add-favourite").style.visibility = "visible";
                document.getElementById("is-favourite").style.visibility = "hidden";
            }else{
                this.alertify.success('Something went wrong');

            }
        })
    }

    isLoggedIn(){
        return this.authService.loggedIn();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    


}
