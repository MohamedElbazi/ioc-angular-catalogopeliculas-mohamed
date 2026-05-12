import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuari {
  id: number;
  nom: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuariActual$ = new BehaviorSubject<Usuari | null>(this.carregarUsuari());

  private carregarUsuari(): Usuari | null {
    const json = localStorage.getItem('usuariActual');
    return json ? JSON.parse(json) as Usuari : null;
  }

  private desarUsuari(usuari: Usuari | null): void {
    if (usuari) {
      localStorage.setItem('usuariActual', JSON.stringify(usuari));
    } else {
      localStorage.removeItem('usuariActual');
    }
  }

  estaAutenticat(): boolean {
    return this.usuariActual$.value !== null;
  }

  obtenirUsuari(): Observable<Usuari | null> {
    return this.usuariActual$.asObservable();
  }

  login(email: string, contrasenya: string): boolean {
    if (email === 'admin@test.com' && contrasenya === '1234') {
      const usuari = { id: 1, nom: 'Admin', email };
      this.usuariActual$.next(usuari);
      this.desarUsuari(usuari);
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuariActual$.next(null);
    this.desarUsuari(null);
  }
}