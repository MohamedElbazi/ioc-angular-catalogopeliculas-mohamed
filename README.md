# Catàleg de Pel·lícules

Aplicació Angular per gestionar un catàleg de pel·lícules amb navegació, autenticació i optimitzacions de rendiment.

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

## Instruccions d'Execució en Local

1. Clona el repositori:
   ```
   git clone [url-repositori]
   cd ioc-angular-catalogopeliculas-mohamed
   ```

2. Instal·la les dependències:
   ```
   npm install
   ```

3. Executa el servidor de desenvolupament:
   ```
   ng serve
   ```

4. Obre http://localhost:4200 al navegador.

## Build de Producció

Executa `ng build --configuration production` per generar el build de producció. Els fitxers es guardaran a `dist/`.

Per obtenir estadístiques de la mida del bundle:
```bash
npm run build:stats
npm run analyze
```

Mida aproximada del bundle: actualitza aquest valor després d'executar `ng build --configuration production`.

## Credencials de Prova

- Email: admin@test.com
- Contrasenya: 1234

## Notes addicionals

Aquest projecte utilitza un llistat amb scroll manual per mostrar les pel·lícules, ja que `@angular/cdk` no està instal·lat en l'entorn actual.

### Scripts útils

- `npm run start`
- `npm run build`
- `npm run build:stats`
- `npm run analyze`
