import {NgModule} from '@angular/core';

import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([{path: 'shopping-list', component: ShoppingListComponent}]),
    FormsModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  providers: [],
})
export class ShoppingListModule {
}
