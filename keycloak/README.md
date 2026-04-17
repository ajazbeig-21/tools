# Keycloak — Complete Guide

A structured, hands-on course covering Keycloak from fundamentals to production-ready integrations.

---

## Table of Contents

- [Module 1: Introduction to Keycloak](#module-1-introduction-to-keycloak)
- [Module 2: Setup & Installation](#module-2-setup--installation)
- [Module 3: Authentication Basics](#module-3-authentication-basics)
- [Module 4: Authorization & RBAC](#module-4-authorization--rbac)
- [Module 5: Integrate with Backend (Spring Boot)](#module-5-integrate-with-backend-spring-boot)
- [Module 6: Frontend Integration](#module-6-frontend-integration)
- [Module 7: Advanced Topics](#module-7-advanced-topics)

---

## Module 1: Introduction to Keycloak

**Duration:** 20–30 mins

A conceptual overview of Keycloak and why it exists.

### Topics

- **What is Keycloak?** — Open-source Identity and Access Management (IAM) solution by Red Hat
- **Why not build auth from scratch?** — Complexity of OAuth2, OIDC, session management, MFA, and security vulnerabilities make DIY auth risky and expensive
- **Real-world usage** — Enterprise SSO, microservices auth, B2B portals, SaaS platforms
- **Architecture overview** — Realms, Clients, Users, Identity Providers, and Token flows

---

## Module 2: Setup & Installation

**Duration:** 30–40 mins

Get Keycloak running locally and understand the admin UI.

### Topics

- **Run Keycloak using Docker**

  ```bash
  docker run -p 8080:8080 \
    -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
    -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
    quay.io/keycloak/keycloak:latest start-dev
  ```

- **Basic UI walkthrough** — Admin Console navigation, theme, and settings
- **Core concepts**
  - **Realms** — Isolated namespaces for users, clients, and config
  - **Users** — Identities managed within a realm
  - **Clients** — Applications that delegate auth to Keycloak

---

## Module 3: Authentication Basics

**Duration:** 40–50 mins

Understand how login flows work and how to manage users and roles.

### Topics

- **Login flow** — Authorization Code Flow, redirect to Keycloak, token issuance
- **Users & Roles** — Creating users, assigning credentials, and defining roles
- **Realm vs Client roles**
  - **Realm roles** — Global across all clients in the realm
  - **Client roles** — Scoped to a specific client/application
- **Demo: Create users & roles** — Step-by-step through the Admin UI

---

## Module 4: Authorization & RBAC

**Duration:** Core module

Implement Role-Based Access Control and understand Keycloak token structure.

### Topics

- **Role-based access control (RBAC)** — Map realm/client roles to API permissions
- **Secure APIs** — Enforce role checks at the resource server level
- **Token structure**
  - **Access Token** — Short-lived JWT containing user claims and roles
  - **Refresh Token** — Long-lived token used to obtain new access tokens without re-login

### Sample Access Token Payload

```json
{
  "sub": "user-uuid",
  "realm_access": {
    "roles": ["admin", "user"]
  },
  "resource_access": {
    "my-client": {
      "roles": ["read", "write"]
    }
  },
  "exp": 1713000000
}
```

---

## Module 5: Integrate with Backend (Spring Boot)

**Duration:** Core module — high demand

Secure Spring Boot REST APIs using Keycloak bearer token validation.

> **USP Module** — This is the most in-demand real-world integration pattern.

### Topics

- **Secure REST APIs** — Configure Spring Security as a resource server
- **Bearer token validation** — Validate JWTs issued by Keycloak
- **Role-based API access** — Use `@PreAuthorize` with realm/client roles

### Quick Setup

**`application.yml`**

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8080/realms/my-realm
```

**Security Config**

```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }
}
```

**Role-protected endpoint**

```java
@GetMapping("/admin")
@PreAuthorize("hasRole('admin')")
public ResponseEntity<String> adminEndpoint() {
    return ResponseEntity.ok("Admin access granted");
}
```

---

## Module 6: Frontend Integration

**Duration:** Optional — but powerful

Integrate Keycloak login into an Angular application.

### Topics

- **Angular login integration** — Using the `keycloak-angular` adapter
- **Token handling** — Storing and attaching access tokens to HTTP requests
- **Route protection** — Auth guards to restrict access to authenticated/authorized users

### Quick Example (Angular Guard)

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private keycloak: KeycloakService) {}

  canActivate(): boolean {
    if (!this.keycloak.isLoggedIn()) {
      this.keycloak.login();
      return false;
    }
    return true;
  }
}
```

---

## Module 7: Advanced Topics

**Duration:** Varies — differentiator module

Production patterns, token lifecycle management, and troubleshooting.

### Topics

- **Keycloak with Docker Compose** — Multi-service setup with a persistent database (PostgreSQL)

  ```yaml
  services:
    postgres:
      image: postgres:15
      environment:
        POSTGRES_DB: keycloak
        POSTGRES_USER: keycloak
        POSTGRES_PASSWORD: secret

    keycloak:
      image: quay.io/keycloak/keycloak:latest
      command: start-dev
      environment:
        KC_DB: postgres
        KC_DB_URL: jdbc:postgresql://postgres/keycloak
        KC_DB_USERNAME: keycloak
        KC_DB_PASSWORD: secret
        KC_BOOTSTRAP_ADMIN_USERNAME: admin
        KC_BOOTSTRAP_ADMIN_PASSWORD: admin
      ports:
        - "8080:8080"
      depends_on:
        - postgres
  ```

- **Production considerations**
  - Use `start` (not `start-dev`) with HTTPS enabled
  - Store secrets in a secrets manager (not environment variables)
  - Configure session timeouts and brute force protection
  - Enable audit logging

- **Token expiry & refresh flow**
  1. Client receives `access_token` (short TTL) and `refresh_token`
  2. On 401, client posts `refresh_token` to `/token` endpoint
  3. Keycloak returns new `access_token`
  4. On `refresh_token` expiry, user must re-authenticate

- **Basic troubleshooting**
  - `401 Unauthorized` — Token expired or invalid issuer URI
  - `403 Forbidden` — User lacks required role; check role mappings
  - Token not containing roles — Ensure role mappers are configured on the client
  - Clock skew issues — Sync server time with NTP

---

## Prerequisites

- Basic understanding of REST APIs
- Java / Spring Boot knowledge (for Module 5)
- Docker installed locally

## Resources

- [Keycloak Official Documentation](https://www.keycloak.org/documentation)
- [Keycloak on GitHub](https://github.com/keycloak/keycloak)
- [Spring Security OAuth2 Resource Server](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html)
