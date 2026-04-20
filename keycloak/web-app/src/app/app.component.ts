import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

const API = 'http://localhost:3000';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `
    <h1>Keycloak Angular Demo</h1>

    <div *ngIf="user; else loggedOut">
      <h3>Welcome, {{ user }}</h3>
      <button (click)="logout()">Logout</button>

      <hr />

      <h4>API Tests</h4>

      <button (click)="callPublic()">GET /api/public</button>
      <button (click)="callProfile()">GET /api/profile</button>
      <button (click)="callAdmin()">GET /api/admin</button>

      <pre *ngIf="apiResult">{{ apiResult | json }}</pre>
      <p *ngIf="apiError" style="color:red">{{ apiError }}</p>
    </div>

    <ng-template #loggedOut>
      <button (click)="login()">Login</button>
    </ng-template>
  `
})
export class AppComponent {
  user: string | undefined;
  apiResult: any;
  apiError: string | undefined;

  constructor(
    private keycloakService: KeycloakService,
    private http: HttpClient
  ) {}

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

  callPublic() {
    this.reset();
    this.http.get(`${API}/api/public`).subscribe({
      next: (res) => (this.apiResult = res),
      error: (err) => (this.apiError = err.message)
    });
  }

  callProfile() {
    this.reset();
    this.http.get(`${API}/api/profile`).subscribe({
      next: (res) => (this.apiResult = res),
      error: (err) => (this.apiError = `${err.status} ${err.statusText} — make sure you are logged in`)
    });
  }

  callAdmin() {
    this.reset();
    this.http.get(`${API}/api/admin`).subscribe({
      next: (res) => (this.apiResult = res),
      error: (err) => (this.apiError = `${err.status} ${err.statusText} — admin role required`)
    });
  }

  private reset() {
    this.apiResult = undefined;
    this.apiError = undefined;
  }
}