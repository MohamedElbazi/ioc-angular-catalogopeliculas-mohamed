# Documentació de Serveis

## ElementService

**Ubicació:** `src/app/services/element.service.ts`

### Descripció
Servei central per a la gestió de dades de pel·lícules. Gestiona la comunicació amb l'API REST i els estats de càrrega, èxits i errors de forma reactiva mitjançant Signals.

### Signals (Lectura)

| Signal | Tipus | Descripció |
|--------|-------|-----------|
| `elements` | `Signal<ElementCataleg[]>` | Llista d'elements carregats |
| `carregant` | `Signal<boolean>` | True mentre hi ha petició en curs |
| `error` | `Signal<string \| null>` | Missatge d'error o null |
| `missatge` | `Signal<string \| null>` | Missatge informatiu (resultats, etc.) |

### Mètodes

#### `obtenirPopulars(): void`
Carrega els elements marcats com populars desde l'API.

**Endpoints:**
- `GET /elements` → filtra `popular=true` al backend

**Comportament:**
1. Activa `carregant = true`
2. Neteja `error`
3. Si èxit: adapta dades i actualitza `elements`
4. Si error: estableix missatge descriptiu

---

#### `cercar(terme: string): void`
Filtra elements per nom/títol.

**Endpoints:**
- `GET /elements` → filtra col·leccio completa

**Comportament:**
1. Si terme buit: crida `obtenirPopulars()`
2. Consulta API per tots els elements
3. Filtra localment amb `.includes()` (case-insensitive)
4. Actualitza `elements` amb resultats
5. Mostra missatge de resultats o "No trobats"

---

## PreferitsService

**Ubicació:** `src/app/services/preferits.service.ts`

### Descripció
Gestiona els elements marcats com preferits amb persistència en localStorage.

### Signals (Lectura)

| Signal | Tipus | Descripció |
|--------|-------|-----------|
| `preferits` | `Signal<ElementPreferit[]>` | Elements favorits carregats |
| `totalPreferits` | `Computed<number>` | Comptador de preferits |

### Mètodes

| Mètode | Paràmetres | Retorn | Descripció |
|--------|-----------|--------|-----------|
| `afegirPreferit()` | `element: ElementCataleg` | `void` | Afegeix element als preferits |
| `eliminarPreferit()` | `id: string` | `void` | Elimina element dels preferits |
| `esPreferit()` | `id: string` | `boolean` | Comprova si és preferit |
| `afegirNota()` | `id: string, nota: string` | `void` | Afegeix nota a preferit |
| `eliminarNota()` | `id: string, index: number` | `void` | Elimina nota de preferit |

### localStorage
- **Clau:** `preferits-cataleg`
- **Format:** JSON array d'ElementPreferit amb propietat `notes[]`
- **Persistència:** Automàtica en cada canvi