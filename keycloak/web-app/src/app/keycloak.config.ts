import { KeycloakConfig } from 'keycloak-js';

const keycloak: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'demo-realm',
  clientId: 'angular-client'
};

export default keycloak;