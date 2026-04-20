import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService, KeycloakBearerInterceptor } from 'keycloak-angular';

import { AppComponent } from './app.component';
import keycloak from './keycloak.config';

function initializeKeycloak(keycloakService: KeycloakService) {
  return () =>
    keycloakService.init({
      config: keycloak,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KeycloakAngularModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}