import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Recipe } from "src/app/models/recipe";
import { RecipeServiceService } from "src/app/services/recipe-service.service";

@Component({
  selector: "app-title-search",
  templateUrl: "./title-search.component.html",
  styleUrls: ["./title-search.component.scss"],
})
export class TitleSearchComponent implements OnInit, OnDestroy {
  recipeComponentSubscription: Subscription = new Subscription();

  inputText: string;
  results: Recipe[] = []

  constructor(private recipeService: RecipeServiceService) {}

  ngOnInit(): void { }

  onSubmit() {
    const recipeSubscription = this.recipeService.getRecipesByTitle(this.inputText).subscribe((data: Recipe[]) => {
      this.results = data;
    });
    this.recipeComponentSubscription.add(recipeSubscription);
  }


  ngOnDestroy(): void {
    this.recipeComponentSubscription.unsubscribe();
  }
}
