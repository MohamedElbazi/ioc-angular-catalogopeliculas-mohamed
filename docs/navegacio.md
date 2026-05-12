# Navegació

## Mapa de Rutes

| Ruta | Component | Accés |
|------|-----------|-------|
| / | Redirecció a /cataleg | Públic |
| /cataleg | CatalegComponent | Públic |
| /cerca | CercaComponent | Públic |
| /detall/:id | DetallComponent | Públic |
| /preferits | PreferitsComponent | Privat (requereix autenticació) |
| /login | LoginComponent | Públic |
| ** | Redirecció a /cataleg | Públic |

## Configuració

Les rutes es configuren a `src/app/app.routes.ts` utilitzant `provideRouter(routes)` a `src/app/app.config.ts`.

El component AppComponent inclou `<router-outlet></router-outlet>` per renderitzar les vistes.

S'utilitzen `routerLink` i `routerLinkActive` per la navegació amb indicadors visuals.

## Control d'accés

La ruta `/preferits` està protegida amb `authGuard` (`src/app/guards/auth.guard.ts`). Si l'usuari no està autenticat, la guard redirigeix a `/login` amb `returnUrl` per tornar a la ruta protegida després del login.

El login es gestiona amb `AuthService` i el component `LoginComponent` navega amb `router.navigateByUrl(returnUrl)` després d'autenticar-se.
