import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    recipe: Recipe = new Recipe();
    ingredients = [];
    constructor(public activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      var ceva = window.history.state;
      this.recipe = ceva.recipe;
      if(this.recipe.total_time == -1)
      this.recipe.total_time = 60;
      this.ingredients = this.recipe.ingredients;
      if(this.recipe.image == ''){
          this.recipe.image = 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/sites/all/themes/bbcw_goodfood/images/dummy-content/member-recipe-icon.png';
      }
    }

}
