import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PreferitsService, ElementPreferit } from '../../services/preferits.service';

@Component({
  selector: 'app-preferits-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferits-panel.component.html',
  styleUrls: ['./preferits-panel.component.scss']
})
export class PreferitsPanelComponent implements OnInit {

  formularis: Map<string, FormGroup> = new Map();

  constructor(
    public preferitsService: PreferitsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.preferitsService.preferits().forEach(preferit => {
      this.crearFormulariPerPreferit(preferit);
    });
  }

  private crearFormulariPerPreferit(preferit: ElementPreferit): void {
    const notesArray = this.fb.array(
      (preferit.notes || []).map(nota =>
        this.fb.control(nota, [
          Validators.required,
          Validators.minLength(3)
        ])
      )
    );

    const form = this.fb.group({
      notes: notesArray
    });

    this.formularis.set(preferit.id, form);
  }

  obtenerNotesArray(id: string): FormArray {
    return this.formularis.get(id)?.get('notes') as FormArray;
  }

  afegirNota(id: string): void {
    const notesArray = this.obtenerNotesArray(id);
    notesArray.push(
      this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ])
    );

    this.guardarNotas(id); // 🔥 guardar automáticamente
  }

  eliminarNota(id: string, index: number): void {
    const notesArray = this.obtenerNotesArray(id);
    notesArray.removeAt(index);
    this.preferitsService.eliminarNota(id, index);
  }

  // 🔥 MÉTODO CLAVE (GUARDADO REAL)
  guardarNotas(id: string): void {
    const notesArray = this.obtenerNotesArray(id);

    const notesValides = notesArray.controls
      .filter(control => control.valid)
      .map(control => control.value);

    const preferit = this.preferitsService.obtenirPreferit(id);

    if (preferit) {
      const actualitzats = this.preferitsService.preferits().map(p => {
        if (p.id === id) {
          return {
            ...p,
            notes: notesValides
          };
        }
        return p;
      });

      // actualizar signal + localStorage
      (this.preferitsService as any)._preferits.set(actualitzats);
      (this.preferitsService as any).desarAlStorage();
    }
  }

  eliminarPreferit(id: string): void {
    this.preferitsService.eliminarPreferit(id);
    this.formularis.delete(id);
  }

  trackByPreferitId(index: number, preferit: ElementPreferit): string {
    return preferit.id;
  }

  trackByNota(index: number): number {
    return index;
  }
}