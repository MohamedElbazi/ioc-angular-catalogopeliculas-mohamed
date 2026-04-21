import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ElementService } from '../../services/element.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-formulari-cerca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulari-cerca.component.html',
  styleUrls: ['./formulari-cerca.component.scss']
})
export class FormulariCercaComponent implements OnInit, OnDestroy {

  @Output() cerca = new EventEmitter<string>();

  termeCerca = new FormControl('', {
    validators: [
      Validators.minLength(2),
      Validators.maxLength(50)
    ],
    asyncValidators: [this.senseResultatsValidator()],
    updateOn: 'change'
  });

  private destroy$ = new Subject<void>();

  constructor(private elementService: ElementService) {}

  ngOnInit() {
    this.termeCerca.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        // 🔍 VALIDACIÓ: Si té menys de 2 caràcters, no buscar
        if (!value || value.trim().length < 2) {
          return; // ← No emet res
        }
        this.cerca.emit(value);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  senseResultatsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;

      // No validar si està vacío o menys de 2 caràcters
      if (!value || value.trim().length < 2) {
        return of(null);
      }

      // Simular consulta a API amb retraso
      return of(value).pipe(
        delay(500),
        map(() => {
          // Verificar si hi ha resultats en el servei
          const elements = this.elementService.elements();
          const tieneResultados = elements.length > 0;

          return tieneResultados ? null : { sensResultats: true };
        })
      );
    };
  }

  netejar() {
    this.termeCerca.setValue('');
    this.cerca.emit('');
  }
}