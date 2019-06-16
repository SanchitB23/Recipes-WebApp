import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const idStr = 'id';
        this.id = +params[idStr];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('recipe:' + this.recipe);
  }

  onAddToShoppingList() {
    this.recipeService.onIngredientsAddToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['./recipes']);

  }
}
