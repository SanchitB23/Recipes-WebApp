import {NgModule} from '@angular/core';

import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: 'auth', component: AuthComponent}]),
    SharedModule
  ],
  exports: [],
  declarations: [AuthComponent],
  providers: [],
})
export class AuthModule {
}
