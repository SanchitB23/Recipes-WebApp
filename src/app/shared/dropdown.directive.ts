import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef) {
  }

  // Can now close dropdown from anywhere
  @HostListener('document:click', ['$event']) toggleOpen() {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }


}
