import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeServiceService } from '../services/recipe-service.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-lucky',
  templateUrl: './lucky.component.html',
  styleUrls: ['./lucky.component.scss']
})
export class LuckyComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  recipe: Recipe = new Recipe();
  constructor(private router: Router, private recipeService: RecipeServiceService) { }
 

  ngOnInit(): void {
    if(localStorage.getItem('random') == '0'){
      var luckySubscription = this.recipeService.getRandom().subscribe((result: Recipe) => {
        this.recipe = result;
        localStorage.setItem('oldLuck', this.recipe.id);
        localStorage.setItem('random','1');
        if(this.recipe.image == ''){
          this.recipe.image = 'https://blog.thewingshotel.com/wp-content/uploads/2018/11/shutterstock_658561456.jpg';
        }
        if(this.recipe.total_time == -1){
          this.recipe.total_time = 40;
        }
      });
      this.subscription.add(luckySubscription);
    } else {
      var id = localStorage.getItem('oldLuck');
      var luckySubscription = this.recipeService.getRecipeById(id).subscribe((result: Recipe) => {
        this.recipe = result;
        if(this.recipe.image == ''){
          this.recipe.image = 'https://blog.thewingshotel.com/wp-content/uploads/2018/11/shutterstock_658561456.jpg';
        }
        if(this.recipe.total_time == -1){
          this.recipe.total_time = 40;
        }
      });
      this.subscription.add(luckySubscription);
    }
    
  }

  tryAgain(){
    location.reload();
    localStorage.setItem('random', '0');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
