import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private activeSubscription: Subscription;

  constructor(private shopListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shopListService.getIngredients();
    this.activeSubscription = this.shopListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );

  }

  ngOnDestroy(): void {
    this.activeSubscription.unsubscribe();
  }

}
