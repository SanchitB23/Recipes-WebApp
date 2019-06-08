import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Mayo Roll',
      'Tasty, Served Hot',
      'https://www.wellplated.com/wp-content/uploads/2017/12/Hoppin-John-recipe-600x629.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Mayo', 1),
        new Ingredient('Maida Parantha', 1),
      ]
    )
  ];

  constructor(private shopListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  onIngredientsAddToShoppingList(ingredients: Ingredient[]) {
    this.shopListService.addIngredients(ingredients);
  }
}
