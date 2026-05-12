import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-cataleg',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cataleg.component.html',
  styleUrl: './cataleg.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalegComponent {
  pelicules: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) {
    this.pelicules = this.peliculaService.obtenirTotes();
  }
}
