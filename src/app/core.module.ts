import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {RecipeService} from './recipes/recipe.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
// @ts-ignore
import {NgModule} from '@angular/core';


@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [ShoppingListService, RecipeService, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
  }],
})
export class CoreModule {
}
