import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  @ViewChild('editForm', {static: false}) shopListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shopService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shopService.editingIndex
      .subscribe(
        (index: number) => {
          this.editItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shopService.getIngredient(index);
          this.shopListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onSubmitItem(form: NgForm) {
    console.log(form);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shopService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.shopService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.shopListForm.reset();  // reset vs resetForm??
  }

  onClear() {
    this.editMode = false;
    this.shopListForm.reset();  // reset vs resetForm??
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.onClear();
    this.shopService.deleteIngredient(this.editItemIndex);
  }
}

