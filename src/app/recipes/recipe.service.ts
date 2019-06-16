import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'White Sauce Penne Pasta',
      'Tasty, Served Hot',
      'https://media4.s-nbcnews.com/i/newscms/2018_41/1375585/katie-lee-pasta-today-main-181010_42c09d6a3aa3fdeba348b860dc4b942d.jpg',
      [
        new Ingredient('Penne Pasta', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Oil', 1),
      ]
    ),
    new Recipe(
      'Chicken Mayo Roll',
      'Tasty, Served Hot',
      'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366,h_240,c_fill/aua2td4ueswve4wkmqcp',
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

  getRecipe(id: number) {
    return this.recipes[id];
  }

  onIngredientsAddToShoppingList(ingredients: Ingredient[]) {
    this.shopListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
