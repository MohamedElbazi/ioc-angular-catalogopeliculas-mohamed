import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, Usuari } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ioc-angular-catalogopeliculas-mohamed';
  usuari$: Observable<Usuari | null>;

  constructor(private authService: AuthService) {
    console.log('Aplicació Catàleg de Pel·lícules iniciada correctament.');
    this.usuari$ = this.authService.obtenirUsuari();
  }

  logout() {
    this.authService.logout();
  }
}

