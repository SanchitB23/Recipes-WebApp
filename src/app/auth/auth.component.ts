import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: true}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private compFactoryResolver: ComponentFactoryResolver,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const {email, password} = form.value;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      }
      ,
      errorMessage => {
        console.error(errorMessage);
        this.error = errorMessage;
        this.showAlertError(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  // onHandleAlert() {
  //   this.error = null;
  // }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showAlertError(errorMessage: string) {
    const alertCmpFactory = this.compFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();

    const componentRef = hostViewContainer.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    });
  }
}
