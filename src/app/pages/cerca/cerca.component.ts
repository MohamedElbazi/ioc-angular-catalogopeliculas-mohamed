import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-cerca',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cerca.component.html',
  styleUrl: './cerca.component.scss'
})
export class CercaComponent {
  query = '';
  resultats: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) {
    this.resultats = this.peliculaService.obtenirTotes();
  }

  onSearch() {
    this.resultats = this.peliculaService.cercar(this.query);
  }
}

