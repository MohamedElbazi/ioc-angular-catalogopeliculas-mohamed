import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../models/pelicula.model';

@Component({
  selector: 'app-detall',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detall.component.html',
  styleUrl: './detall.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetallComponent implements OnInit {
  pelicula: Pelicula | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Simulate fetching movie by id
      this.pelicula = {
        id: +id,
        titol: `Pel·lícula ${id}`,
        any: 2000 + (+id % 20),
        genere: ['Acció', 'Comèdia', 'Drama', 'Terror'][+id % 4],
        director: `Director ${id}`,
        descripcio: `Descripció detallada de la pel·lícula ${id}.`
      };
    }
  }
}
