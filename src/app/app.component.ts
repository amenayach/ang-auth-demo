import { Component } from '@angular/core';
import { AuthService } from './auth-service';
import { UserInfo } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ang-auth-demo';
  userInfo?: any

  constructor(private readonly authService: AuthService) {
    authService.userProfileSubject.subscribe(userInfo => {
      this.userInfo = userInfo
      console.log('userInfo', this.userInfo)
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  logout() {
    this.authService.signOut()
  }
}
