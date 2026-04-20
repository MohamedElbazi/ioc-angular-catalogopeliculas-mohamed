import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LlistaElementsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ioc-angular-catalogopeliculas-mohamed';

  constructor() {
    console.log('Aplicació inicialitzada correctament: Catàleg de Pel·lícules');
  }
}