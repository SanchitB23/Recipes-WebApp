import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('recipe:' + this.recipe);
  }

  onAddToShoppingList() {
    this.recipeService.onIngredientsAddToShoppingList(this.recipe.ingredients);
  }
}
