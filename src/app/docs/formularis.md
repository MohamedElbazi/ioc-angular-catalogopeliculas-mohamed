# Documentació de Formularis

## FormulariCerca

**Ubicació:** `src/app/components/formulari-cerca/`

### Descripció
Formulari reactiu per a búsqueda de pel·lícules amb validacions síncrones i asíncrones.

### Validadors

#### Síncrons
- **minLength:** 2 caràcters (msg: "Mínim 2 caràcters")
- **maxLength:** 50 caràcters (msg: "Màxim 50 caràcters")

#### Asíncrons
- **senseResultatsValidator:** Simula consulta a API (500ms delay)
  - Comprova si `elementService.elements().length > 0`
  - Retorna error `{ sensResultats: true }` si no hi ha resultats

### Comportament

**Debounce:**
- Retraso de **400ms** mentre l'usuari escriu
- `distinctUntilChanged()` evita emissió duplicada

**Mostrar Errors:**
- Sols es mostren errors quan el campo té `ng-touched`
- Indicador "🔄 Validant..." mentre validació asíncrona

**Botó Netejar:**
- Visible només si `termeCerca.value` conté text
- Buida el formulari i emet cerca buida

### FormControl

```typescript
termeCerca = new FormControl('', {
  validators: [Validators.minLength(2), Validators.maxLength(50)],
  asyncValidators: [this.senseResultatsValidator()],
  updateOn: 'change'
});
```

---

## PreferitsPanelComponent

**Ubicació:** `src/app/components/preferits-panel/`

### Descripció
Panell de gestió de preferits amb FormArray dinàmic per a notes.

### FormArray Dinàmic

Cada preferit té un FormArray `notes` que:
- Accepta notes de **mínim 3 caràcters**
- Cada nota és un `FormControl` amb validacions
- Botó **"+"** afegeix nou camp buit
- Botó **"✕"** elimina nota individual

### Validacions de Nota
- **required:** No pot estar buida
- **minLength(3):** Mínim 3 caràcters
- Missatge d'error visual sota cada input

### Persistència
Les notes es desen automàticament al PreferitsService, que les persisteix a localStorage.

### Exemple FormArray
```typescript
const notesArray = this.fb.array(
  notas.map(nota =>
    this.fb.control(nota, [
      Validators.required,
      Validators.minLength(3)
    ])
  )
);
```