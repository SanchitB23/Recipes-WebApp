import {NgModule} from '@angular/core';
import {AlertComponent} from './alert/alert.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  providers: [],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {
}
