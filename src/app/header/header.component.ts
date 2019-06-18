import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  // @Output() featureSelected = new EventEmitter<string>();
  private subscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(res => console.log('subdata:', res));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
  }
}
