import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementCataleg, ElementApiResponse } from '../models/element.model';
import { adaptarElementsApi } from '../adaptadors/element.adaptador';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  private url = `${environment.apiUrl}/elements`;

  private _elements = signal<ElementCataleg[]>([]);
  private _carregant = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _missatge = signal<string | null>(null);

  elements = this._elements.asReadonly();
  carregant = this._carregant.asReadonly();
  error = this._error.asReadonly();
  missatge = this._missatge.asReadonly();

  constructor(private http: HttpClient) {}

  obtenirPopulars() {
    this._carregant.set(true);
    this._error.set(null);
    this._missatge.set(null);

    this.http.get<ElementApiResponse[]>(this.url).subscribe({
      next: (data) => {
        const adaptats = adaptarElementsApi(data);
        this._elements.set(adaptats);
        this._carregant.set(false);
        this._missatge.set('✅ Dades carregades correctament');
      },
      error: (err) => {
        console.error('Error:', err);
        this._error.set('❌ Error carregant els elements. Revisa que json-server estigui en marxa.');
        this._carregant.set(false);
      }
    });
  }

  cercar(terme: string): void {
    // Si el terme és buit, mostrar tots els elements populars
    if (!terme || terme.trim() === '') {
      this.obtenirPopulars();
      return;
    }

    this._carregant.set(true);
    this._error.set(null);
    this._missatge.set(null);

    this.http.get<ElementApiResponse[]>(this.url).subscribe({
      next: (data) => {
        const adaptats = adaptarElementsApi(data);

        // 🔍 FILTRO CORRECTO: includes() en lugar de startsWith()
        const filtrats = adaptats.filter(el =>
          el.titol.toLowerCase().includes(terme.trim().toLowerCase())
        );

        this._elements.set(filtrats);
        this._carregant.set(false);

        if (filtrats.length === 0) {
          this._missatge.set(`❌ No s'han trobat resultats per "${terme}"`);
        } else {
          this._missatge.set(`🔎 ${filtrats.length} resultat(s) per "${terme}"`);
        }
      },
      error: (err) => {
        console.error('Error en la cerca:', err);
        this._error.set('❌ Error en la cerca. Revisa la connexió a l\'API.');
        this._carregant.set(false);
      }
    });
  }
}