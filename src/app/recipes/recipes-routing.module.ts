import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeResolverService} from './recipe-resolver.service';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesComponent} from './recipes.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {AuthGuard} from '../auth/auth.guard';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RecipesRoutingModule {
}
