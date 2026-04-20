import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

const API = 'http://localhost:3000';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-950 text-white font-sans">

      <!-- Navbar -->
      <nav class="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-sm">K</div>
          <span class="text-lg font-semibold tracking-wide">Keycloak Demo</span>
        </div>
        <div *ngIf="user; else navLoginBtn">
          <span class="text-sm text-gray-400 mr-4">Logged in as <span class="text-white font-medium">{{ user }}</span></span>
          <button (click)="logout()"
            class="text-sm px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium">
            Logout
          </button>
        </div>
        <ng-template #navLoginBtn>
          <button (click)="login()"
            class="text-sm px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition font-semibold">
            Login
          </button>
        </ng-template>
      </nav>

      <!-- Content -->
      <main class="max-w-2xl mx-auto px-4 py-12">

        <!-- Logged out state -->
        <div *ngIf="!user" class="text-center py-24">
          <div class="text-6xl mb-6">🔐</div>
          <h1 class="text-3xl font-bold mb-2">Keycloak Angular + Node.js</h1>
          <p class="text-gray-400 mb-8">Login to test role-based API access</p>
          <button (click)="login()"
            class="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg transition">
            Login with Keycloak
          </button>
        </div>

        <!-- Logged in state -->
        <div *ngIf="user">
          <h1 class="text-2xl font-bold mb-1">Welcome back, <span class="text-yellow-400">{{ user }}</span> 👋</h1>
          <p class="text-gray-400 mb-8 text-sm">Use the buttons below to test protected API endpoints</p>

          <!-- API Buttons -->
          <div class="grid grid-cols-1 gap-4 mb-8">

            <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <span class="text-xs font-mono bg-green-900 text-green-300 px-2 py-0.5 rounded mr-2">GET</span>
                  <span class="font-mono text-sm text-gray-200">/api/public</span>
                </div>
                <span class="text-xs text-gray-500">No auth required</span>
              </div>
              <p class="text-xs text-gray-500 mb-3">Open to everyone — no token needed</p>
              <button (click)="callPublic()"
                class="w-full py-2 rounded-lg bg-green-700 hover:bg-green-600 text-sm font-medium transition">
                Call Public API
              </button>
            </div>

            <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <span class="text-xs font-mono bg-blue-900 text-blue-300 px-2 py-0.5 rounded mr-2">GET</span>
                  <span class="font-mono text-sm text-gray-200">/api/profile</span>
                </div>
                <span class="text-xs text-gray-500">Requires login</span>
              </div>
              <p class="text-xs text-gray-500 mb-3">Bearer token validated — any authenticated user</p>
              <button (click)="callProfile()"
                class="w-full py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-sm font-medium transition">
                Call Profile API
              </button>
            </div>

            <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <span class="text-xs font-mono bg-red-900 text-red-300 px-2 py-0.5 rounded mr-2">GET</span>
                  <span class="font-mono text-sm text-gray-200">/api/admin</span>
                </div>
                <span class="text-xs text-gray-500">Requires admin role</span>
              </div>
              <p class="text-xs text-gray-500 mb-3">Role-restricted — only <span class="text-red-400 font-mono">realm:admin</span> users can access</p>
              <button (click)="callAdmin()"
                class="w-full py-2 rounded-lg bg-red-700 hover:bg-red-600 text-sm font-medium transition">
                Call Admin API
              </button>
            </div>

          </div>

          <!-- Response -->
          <div *ngIf="apiResult" class="bg-gray-900 border border-green-800 rounded-xl p-4">
            <p class="text-xs text-green-400 font-semibold mb-2 uppercase tracking-wide">✓ Response</p>
            <pre class="text-sm text-green-300 whitespace-pre-wrap break-all">{{ apiResult | json }}</pre>
          </div>

          <div *ngIf="apiError" class="bg-gray-900 border border-red-800 rounded-xl p-4">
            <p class="text-xs text-red-400 font-semibold mb-2 uppercase tracking-wide">✗ Error</p>
            <p class="text-sm text-red-300">{{ apiError }}</p>
          </div>

        </div>
      </main>
    </div>
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