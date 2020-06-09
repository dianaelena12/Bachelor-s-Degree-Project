import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeServiceService } from '../services/recipe-service.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-search-by-ingredients',
  templateUrl: './search-by-ingredients.component.html',
  styleUrls: ['./search-by-ingredients.component.scss']
})
export class SearchByIngredientsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  currentIngredient: string = '';
  ingredients: string[] = [];
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeServiceService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    localStorage.setItem('buttonPushed', '0');
  }

  onSubmit(){
    if(this.currentIngredient != '')
      this.ingredients.push(this.currentIngredient);
    this.currentIngredient = '';
  }

  wasPushed(){
    var pushed = localStorage.getItem('buttonPushed');
    if(pushed == '1'){
      return true;
    }
    return false;
  }

  find(){
    if(this.ingredients.length < 1){
      this.alertify.error('Add ingredients first!');
    } else {
      console.log(this.ingredients);
      var ingredientsSubscription = this.recipeService.getRecipesByIngredients(this.ingredients).subscribe((response: Recipe[]) => {
        this.recipes = response;
        localStorage.setItem('buttonPushed', '1');
        if(this.recipes.length < 1){
          localStorage.setItem('found', '0');
        } else {
          localStorage.setItem('found', '1');
        }
        for(let recipe of this.recipes){
          if(recipe.image == '')
            recipe.image = 'https://tastesbetterfromscratch.com/wp-content/uploads/2017/06/Fresh-Fruit-Bowl-2.jpg';
          if(recipe.total_time == -1)
            recipe.total_time = 45
        }
      });
      this.subscription.add(ingredientsSubscription);
    }
  }

  notFound(){
    var found = localStorage.getItem('found');
    if(found == '1'){
        return false;
    }
    return true;
  }

  removeIngredient(event, ingredient) {
    var index: number = this.ingredients.indexOf(ingredient);
    if (index !== -1) {
        this.ingredients.splice(index, 1);
    }    
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
