import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private pelicules: Pelicula[] = [];

  constructor() {
    for (let i = 1; i <= 60; i++) {
      this.pelicules.push({
        id: i,
        titol: `Pel·lícula ${i}`,
        any: 2000 + (i % 20),
        genere: ['Acció', 'Comèdia', 'Drama', 'Terror'][i % 4],
        director: `Director ${i}`,
        descripcio: `Descripció de la pel·lícula ${i}.`
      });
    }
  }

  obtenirTotes(): Pelicula[] {
    return [...this.pelicules];
  }

  cercar(text: string): Pelicula[] {
    const consulta = text.trim().toLowerCase();
    if (!consulta) {
      return this.obtenirTotes();
    }

    return this.pelicules.filter(p =>
      p.titol.toLowerCase().includes(consulta) ||
      p.genere.toLowerCase().includes(consulta) ||
      p.director.toLowerCase().includes(consulta)
    );
  }
}
