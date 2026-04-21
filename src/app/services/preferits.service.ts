import { Injectable, signal, computed } from '@angular/core';
import { ElementCataleg } from '../models/element.model';

export interface ElementPreferit extends ElementCataleg {
  notes?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PreferitsService {

  private readonly STORAGE_KEY = 'preferits-cataleg';
  private _preferits = signal<ElementPreferit[]>([]);

  preferits = this._preferits.asReadonly();
  totalPreferits = computed(() => this._preferits().length);

  constructor() {
    this.carregarDelStorage();
  }

  /**
   * Carrega els preferits del localStorage
   */
  private carregarDelStorage(): void {
    try {
      const dades = localStorage.getItem(this.STORAGE_KEY);
      if (dades) {
        const parsed = JSON.parse(dades);
        this._preferits.set(parsed);
      }
    } catch (error) {
      console.error('Error carregant preferits del localStorage:', error);
      this._preferits.set([]);
    }
  }

  /**
   * Desa els preferits al localStorage
   */
  private desarAlStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._preferits()));
    } catch (error) {
      console.error('Error desant preferits al localStorage:', error);
    }
  }

  /**
   * Afegeix un element als preferits
   */
  afegirPreferit(element: ElementCataleg): void {
    const actual = this._preferits();
    const yaExiste = actual.some(p => p.id === element.id);

    if (!yaExiste) {
      this._preferits.set([...actual, { ...element, notes: [] }]);
      this.desarAlStorage();
    }
  }

  /**
   * Elimina un element dels preferits
   */
  eliminarPreferit(id: string): void {
    const actual = this._preferits();
    const filtrats = actual.filter(p => p.id !== id);
    this._preferits.set(filtrats);
    this.desarAlStorage();
  }

  /**
   * Comprova si un element és preferit
   */
  esPreferit(id: string): boolean {
    return this._preferits().some(p => p.id === id);
  }

  /**
   * Afegeix una nota a un preferit
   */
  afegirNota(id: string, nota: string): void {
    const actual = this._preferits();
    const actualitzats = actual.map(p => {
      if (p.id === id) {
        return {
          ...p,
          notes: [...(p.notes || []), nota]
        };
      }
      return p;
    });
    this._preferits.set(actualitzats);
    this.desarAlStorage();
  }

  /**
   * Elimina una nota d'un preferit
   */
  eliminarNota(id: string, indexNota: number): void {
    const actual = this._preferits();
    const actualitzats = actual.map(p => {
      if (p.id === id) {
        return {
          ...p,
          notes: (p.notes || []).filter((_, i) => i !== indexNota)
        };
      }
      return p;
    });
    this._preferits.set(actualitzats);
    this.desarAlStorage();
  }

  /**
   * Obté un preferit per ID
   */
  obtenirPreferit(id: string): ElementPreferit | undefined {
    return this._preferits().find(p => p.id === id);
  }
}