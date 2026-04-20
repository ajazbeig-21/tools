import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `
    <h1>Keycloak Angular Demo</h1>

    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>

    <div *ngIf="user">
      <h3>Welcome {{ user }}</h3>
    </div>
  `
})
export class AppComponent {
  user: string | undefined;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    if (isLoggedIn) {
      const profile = await this.keycloakService.loadUserProfile();
      this.user = profile.username;
    }
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}