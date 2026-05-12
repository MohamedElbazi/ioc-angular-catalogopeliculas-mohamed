# Optimització

## Components amb OnPush

- CatalegComponent: Utilitza ChangeDetectionStrategy.OnPush per optimitzar el rendiment en llistes grans.
- DetallComponent: Utilitza ChangeDetectionStrategy.OnPush per evitar deteccions innecessàries.

## Virtualització

Actualment el projecte utilitza `*ngFor` amb scroll manual per mostrar la llista de pel·lícules, ja que el paquet `@angular/cdk` no està instal·lat en el sistema actual.

- Nombre d'elements: 60