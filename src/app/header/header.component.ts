import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated= this.authService.isAuth();
    this.authListenerSub= this.authService.getAuthStatusListener()
      .subscribe(status=> this.isAuthenticated= status)
  }

  ngOnDestroy(){
    this.authListenerSub.unsubscribe();
  }

  onLogOut(){
    this.authService.logout();
  }
}
