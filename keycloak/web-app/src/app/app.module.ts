import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app.component';
import keycloak from './keycloak.config';

function initializeKeycloak(keycloakService: KeycloakService) {
  return () =>
    keycloakService.init({
      config: keycloak,
      initOptions: {
        onLoad: 'login-required', // auto redirect to login
        checkLoginIframe: false
      }
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}